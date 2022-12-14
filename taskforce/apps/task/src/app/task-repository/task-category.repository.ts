import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { TaskCategoryInterface } from "@taskforce/shared-types";
import { PrismaService } from "../prisma/prisma.service";
import { TaskCategoryEntity } from "./entities/task-category.entity";

@Injectable()
export class TaskCategoryRepository {
  private readonly logger: LoggerService = new Logger(TaskCategoryRepository.name);

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  public async create(item: TaskCategoryEntity): Promise<TaskCategoryInterface> {
    return this.prismaService.category.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<TaskCategoryInterface> {
    return await this.prismaService.category.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<TaskCategoryInterface | null> {
    return this.prismaService.category.findFirst({
      where: {
        id
      }
    });
  }

  public findByName(title: string): Promise<TaskCategoryInterface | null> {
    return this.prismaService.category.findFirst({
      where: {
        title: title,
      }
    });
  }

  public find(ids: number[] = []): Promise<TaskCategoryInterface[]> {
    return this.prismaService.category.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: TaskCategoryEntity): Promise<TaskCategoryInterface> {
    return this.prismaService.category.update({
      where: {
        id
      },
      data: { ...item.toObject(), id }
    });
  }
}
