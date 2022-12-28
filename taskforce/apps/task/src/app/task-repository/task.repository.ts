import * as crypto from 'crypto';
import * as dayjs from'dayjs';

import { Injectable } from '@nestjs/common';
import { TaskCategoryInterface, TaskStatusType } from '@taskforce/shared-types';
import { TaskEntity } from './entities/task.entity';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { DEFAULT_TASKS_LIMIT } from '../../assets/constant/constants';
import { TaskQuery } from '../../assets/query/task.query';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prismaService.task.create({
      data: {
        ...entityData,
        category: {
          connect: { id: entityData.category.id }
        }
      },
      include: {
        category: true,
      }
    });
  }

  public async find(query: TaskQuery): Promise<Task[]> {
    const { limit, page, sort, categories, city, tags } = query;

    return await this.prismaService.task.findMany({
      where: {
        category: {
          some: {
            title: {
              in: categories,
            },
          }
        },
        tags: (() => {
          if (!tags) {
            return undefined;
          }

          return {
            hasSome: tags,
          };
        })(),
      },
      take: limit,
      include: {
        category: true
      },
      orderBy: [
        (() => {
          if (sort === 'desc') {
            return {
              createdAt: sort,
            };
          }
          if (sort === 'popular') {
            return {
              repliedPerformers: 'desc',
            };
          }
        })()
      ],
      skip: (page - 1) * limit,
    });
  }

  public async findById(id: number): Promise<Task> {
    return await this.prismaService.task.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  public async update(id: number, item: UpdateTaskDto, category?: TaskCategoryInterface): Promise<Task> {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        ...item,
        tags: {
          push: [...item.tags],
        },
        category: {
          set: {
            id: category.id,
          }
        },
      },
      include: {
        category: true,
      }
    })
  }

  public async updateStatus(id: number, status: TaskStatusType): Promise<Task> {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        category: true,
      }
    })
  }

  public async choosePerformerUserIdToTaskById(id: number, userId: string): Promise<Task> {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        currentPerformer: userId,
      },
      include: {
        category: true,
      }
    })
  }

  public async addReplyPerformerToTaskById(id: number, userId: string): Promise<Task> {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        repliedPerformers: {
          push: userId,
        },
      },
      include: {
        category: true,
      }
    })
  }

  public async delete(id: number): Promise<void> {
    await this.prismaService.task.delete({
      where: {
        id,
      }
    });

    return;
  }
}
