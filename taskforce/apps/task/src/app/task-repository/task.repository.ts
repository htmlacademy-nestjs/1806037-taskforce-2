import * as crypto from 'crypto';
import * as dayjs from'dayjs';

import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskCategoryInterface, TaskInterface, TaskStatusEnum, TaskStatusType } from '@taskforce/shared-types';
import { TaskEntity } from './entities/task.entity';
import { DEFAULT_TASKS_COUNT } from '../../assets/constants';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { TaskDto } from '../task/dto/task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  private taskRepository: object = {};

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prismaService.task.create({
      data: {
        ...entityData,
        category: {
          connect: [...entityData.category],
        },
      },
      include: {
        category: true,
      }
    });
  }

  public async find(paginationCount: number): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      skip: (paginationCount - 1) * DEFAULT_TASKS_COUNT,
      take: DEFAULT_TASKS_COUNT,
      include: {
        category: true
      }
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
        category: {
          deleteMany: {},
          connect: [{id: category.id}],
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
