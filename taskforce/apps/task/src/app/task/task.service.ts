import { Injectable } from '@nestjs/common';
import { TaskStatusType } from '@taskforce/shared-types';
import { DEFAULT_PAGINATION_COUNT } from '../../assets/constant/constants';
import { checkUpdateStatusTaskFn } from '../../assets/helper/heplers';
import { TaskCategoryService } from '../task-category/task-category.service';
import { TaskEntity } from '../task-repository/entities/task.entity';
import { TaskCategoryRepository } from '../task-repository/task-category.repository';
import { TaskRepository } from '../task-repository/task.repository';
import { ReplyPerformerUserIdDto } from './dto/reply-performer-userid.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChoosePerformeruserIdDto } from './dto/choose-performer-userid.dto';
import { TaskQuery } from '../../assets/query/task.query';

@Injectable()
export class TaskService {
  constructor (
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryService: TaskCategoryService,
    private readonly taskCategoryRepository: TaskCategoryRepository,
  ) { }

  public async create(dto: CreateTaskDto): Promise<TaskEntity> {
    let existCategory = await this.taskCategoryService.getByName(dto.category);

    if (!existCategory) {
      const createCategoryDto = { title: dto.category };
      existCategory = await this.taskCategoryService.create(createCategoryDto);
    }

    const newTask = new TaskEntity(dto, existCategory);

    return await this.taskRepository.create(newTask) as unknown as TaskEntity;
  }

  public async get(query: TaskQuery): Promise<TaskEntity[]> {
    return await this.taskRepository.find(query) as unknown as TaskEntity[];
  }

  public async getTaskById(taskId: number): Promise<TaskEntity | null> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} was not found`);
    }

    return existTask as unknown as TaskEntity;
  }

  public async updateTaskById(taskId: number, dto: UpdateTaskDto): Promise<TaskEntity> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} is not found`);
    }

    let existCategory = await this.taskCategoryService.getByName(dto.category);

    if (!existCategory) {
      const createCategoryDto = { title: dto.category };
      existCategory = await this.taskCategoryService.create(createCategoryDto);
    }

    return await this.taskRepository.update(taskId, dto, existCategory) as unknown as TaskEntity;
  }

  public async updateStatusTask(taskId: number, status: TaskStatusType): Promise<TaskEntity | string> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} is not found`);
    }

    const currentStatus = existTask.status;
    const checkResult =  checkUpdateStatusTaskFn(currentStatus, status);

    if (typeof checkResult !== 'boolean') {
      throw new Error(checkResult);
    }

    return await this.taskRepository.updateStatus(taskId, status) as unknown as TaskEntity;
  }

  public async choosePerformerUserIdToTaskById(taskId: number, dto: ChoosePerformeruserIdDto): Promise<TaskEntity> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} is not found`);
    }

    const { userId } = dto;

    if (userId === existTask.currentPerformer) {
      throw new Error(`This user: ${userId} has already been selected as the task executor`);
    }

    return await this.taskRepository.choosePerformerUserIdToTaskById(taskId, userId) as unknown as TaskEntity;
  }

  public async addReplyPerformerUserIdToTaskById(taskId: number, dto: ReplyPerformerUserIdDto): Promise<TaskEntity> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} is not found`);
    }

    const { userId } = dto;

    const isTargetReply = existTask.repliedPerformers.find(item => item === userId)

    if (isTargetReply) {
      throw new Error(`This user: ${userId} has already responded to this task`);
    }

    return await this.taskRepository.addReplyPerformerToTaskById(taskId, userId) as TaskEntity;
  }

  public async deleteTaskById(taskId: number): Promise<void> {
    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new Error(`Task with this id: ${taskId} is not found`);
    }

    return await this.taskRepository.delete(taskId);
  }


}
