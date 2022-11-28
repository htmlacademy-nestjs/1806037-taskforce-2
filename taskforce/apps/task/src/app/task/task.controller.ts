import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateTaskDto } from './dto/create-task.dto';
import { StatusTaskDto } from './dto/status-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor (
    private readonly taskService: TaskService,
  ) { }

  @ApiResponse({
    description: 'Create new task'
  })
  @Post()
  public async createTask(@Body() dto: CreateTaskDto): Promise<TaskDto | ValidationError[]> {
    const newTask = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(newTask, { skipMissingProperties: true });


    if (errors.length > 0) {
      return errors;
    }

    // ЗДЕСЬ ЕСТЬ МОМЕНТ С СОЗДАНИЕМ КАТЕГОРИЙ, НО ЭТО В РАЗДЕЛЕ С БД!!!


    return fillDTO(TaskDto, await this.taskService.createTask(newTask));
  }

  @ApiResponse({
    description: 'Get tasks list'
  })
  @Get()
  public async getTasks(@Query('page') page: number): Promise<TaskDto | TaskDto[]> {
    const paginationCount = Number(Number(page).toFixed(0));

    if (!isNaN(paginationCount) && paginationCount > 1) {
      return fillDTO(TaskDto, await this.taskService.getTasks(paginationCount));
    }

    return fillDTO(TaskDto, await this.taskService.getTasks());
  }

  @ApiResponse({
    description: 'Get task by id'
  })
  @Get(':id')
  public async getTask(@Param('id') taskId: string): Promise<TaskDto | string> {
    const existTask = await this.taskService.getTaskById(taskId);

    if (existTask === null) {
      return `Task with this id: ${taskId} is not found`;
    }

    return fillDTO(TaskDto, existTask);
  }

  @ApiResponse({
    description: 'Update task by id'
  })
  @Put(':id')
  public async updateTask(@Param('id') taskId: string, @Body() dto: UpdateTaskDto): Promise<TaskDto | ValidationError[] | string> {
    const updateTask = plainToInstance(UpdateTaskDto, dto, { exposeUnsetFields: false });
    const errors = await validate(updateTask, { skipMissingProperties: true });

    if (errors.length > 0) {
      return errors;
    }

    const updatedTask = await this.taskService.updateTaskById(taskId, updateTask);

    if (!updatedTask) {
      return `Task with this id: ${taskId} is not found`;
    }

    return fillDTO(TaskDto, updatedTask);
  }

  @ApiResponse({
    description: 'Update status task by id'
  })
  @Put(':id/updatestatus')
  public async updateStatusTask(@Param('id') taskId: string, @Body() dto: StatusTaskDto): Promise<TaskDto | string | ValidationError[]> {
    const targetDto = plainToInstance(StatusTaskDto, dto);
    const errors = await validate(targetDto);

    if (errors.length > 0) {
      return errors;
    }

    const { statusTask } = targetDto;

    const result = await this.taskService.updateStatusTask(taskId, statusTask);

    if (result === null) {
      return `Task with this id: ${taskId} is not found`;
    }

    return fillDTO(TaskDto, result);
  }

  @ApiResponse({
    description: 'Delete task by id'
  })

  @ApiResponse({
    description: 'Add reply to task by id'
  })
  @Put(':id/addreply')
  public async addReplyToTask(@Param('id') taskId: string, @Body() dto: any): Promise<TaskDto | string> {
    // ВАЛИДАЦИЯ ИД НУЖНА БУДЕТ !!! performerInfo

    const result = await this.taskService.addReplyToTaskById(taskId, dto);

    if (result === null) {
      return `Task with this id: ${taskId} is not found`;
    }

    return fillDTO(TaskDto, result);
  }

  @Delete(':id')
  public async deleteTask(@Param('id') taskId: string): Promise<string> {
    const result = await this.taskService.deleteTaskById(taskId);

    if (result === null) {
      return `Task with this id: ${taskId} is not found`;
    }

    return 'OK';
  }
}
