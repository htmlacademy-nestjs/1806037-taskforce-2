import { Injectable } from '@nestjs/common';
import { TaskInterface, TaskStatusEnum } from '@taskforce/shared-types';
import { DEFAULT_PAGINATION_COUNT } from '../../assets/constants';
import { checkUpdateStatusTaskFn } from '../../assets/heplers';
import { TaskEntity } from '../task-memory/entities/task.entity';
import { TaskMemoryRepository } from '../task-memory/task-memory.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor (
    private readonly taskRepository: TaskMemoryRepository,
  ) { }

  public async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    const newTask = new TaskEntity(dto);

    return await this.taskRepository.create(newTask);
  }

  public async getTasks(paginationCount?: number): Promise<TaskInterface[]> {
    if (paginationCount) {
      return await this.taskRepository.findTasks(paginationCount);
    }

    return await this.taskRepository.findTasks(DEFAULT_PAGINATION_COUNT);
  }

  public async getTaskById(taskId: string): Promise<TaskInterface | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      return null;
    }

    return existTask;
  }

  public async updateTaskById(taskId: string, dto: UpdateTaskDto): Promise<TaskInterface | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      return null;
    }

    return await this.taskRepository.update(taskId, dto);
  }

  public async addReplyToTaskById(taskId: string, performerInfo: any): Promise<TaskDto | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      return null;
    }

    // ЗДЕСЬ НУЖНА РЕАЛИЗАЦИЯ ПРОВЕРКИ НА УНИКАЛЬНОСТЬ ОТКЛИКА

    // const repliedPerformersList = existTask.repliedPerformers;

    // for (const item of repliedPerformersList) {
    //   console.log(item);
    // }

    return await this.taskRepository.addReplyPerformerToTaskById(taskId, performerInfo);
  }

  public async deleteTaskById(taskId: string): Promise<void | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      return null;
    }

    return await this.taskRepository.delete(taskId);
  }

  public async updateStatusTask(taskId: string, status: keyof typeof TaskStatusEnum): Promise<TaskInterface | string | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      return null;
    }

    const currentStatus = existTask.status;

    const checkResult =  checkUpdateStatusTaskFn(currentStatus, status);

    if (typeof checkResult !== 'boolean') {
      return checkResult;
    }

    return await this.taskRepository.update(taskId, status);
  }

}
