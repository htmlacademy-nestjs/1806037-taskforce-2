import * as crypto from 'crypto';
import * as dayjs from'dayjs';

import { Injectable } from '@nestjs/common';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskStatusEnum } from '@taskforce/shared-types';
import { TaskEntity } from './entities/task.entity';
import { DEFAULT_TASKS_COUNT } from '../../assets/constants';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { TaskDto } from '../task/dto/task.dto';

@Injectable()
export class TaskMemoryRepository implements CRUDRepositoryInterface<TaskEntity, string, TaskDto> {
  private taskRepository: object = {};

  public async create(item: TaskEntity): Promise<TaskDto> {
    const id = crypto.randomUUID();
    this.taskRepository[id] = { _id: id, ...item.toObject(), createdAt: dayjs().toDate() };

    return this.taskRepository[id];
  }

  public async findTasks(paginationCount: number): Promise<TaskDto[]> {
    const filterTasks = Object.values(this.taskRepository).filter((item: TaskEntity) => item.status === TaskStatusEnum.New);

    return filterTasks.slice((paginationCount - 1) * DEFAULT_TASKS_COUNT, paginationCount * DEFAULT_TASKS_COUNT);
  }

  public async findById(id: string): Promise<TaskDto> {
    return this.taskRepository[id];
  }

  public async update(id: string, item: any): Promise<TaskDto> {
    const updatedAtArr: Array<any> = this.taskRepository[id].updatedAt;
    updatedAtArr.push(dayjs().toDate());

    this.taskRepository[id] = { ...this.taskRepository[id], ...item, updatedAt: updatedAtArr };

    return this.taskRepository[id];
  }

  public async addReplyPerformerToTaskById(id: string, payload: any): Promise<TaskDto> {
    const repliedPerformers: Array<any> = this.taskRepository[id].repliedPerformers;
    repliedPerformers.push(payload);

    const updatedAtArr: Array<any> = this.taskRepository[id].updatedAt;
    updatedAtArr.push(dayjs().toDate());

    this.taskRepository[id] = {
      ...this.taskRepository[id],
      repliedPerformers: repliedPerformers,
      updatedAt: updatedAtArr,
    };

    return this.taskRepository[id];
  }

  public async delete(id: string): Promise<void> {
    delete this.taskRepository[id];

    return;
  }
}
