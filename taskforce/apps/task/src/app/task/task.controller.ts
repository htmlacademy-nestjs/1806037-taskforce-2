import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { ValidationError } from 'class-validator';
import { ReplyPerformerUserIdDto } from './dto/reply-performer-userid.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { StatusTaskDto } from './dto/status-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { ChoosePerformeruserIdDto } from './dto/choose-performer-userid.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { TaskQuery } from '../../assets/query/task.query';

@ApiTags('task')
@Controller('task')
export class TaskController {
  private readonly logger: LoggerService = new Logger(TaskController.name);

  constructor (
    private readonly taskService: TaskService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new task',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createTask(@Body() dto: CreateTaskDto): Promise<TaskDto | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.create(dto));
    } catch (err) {
      if (err.errorType === 'ValidationError') {
        const error = err.value as ValidationError;
        this.logger.error(error.toString());

        return error.toString();
      }

      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get tasks list',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTasks(@Query() query: TaskQuery): Promise<TaskDto | TaskDto[] | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.get(query));
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }


  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task by id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getTask(@Param('id', ParseIntPipe) taskId: number): Promise<TaskDto | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.getTaskById(taskId));
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update task by id',
  })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  public async updateTask(@Param('id', ParseIntPipe) taskId: number, @Body() dto: UpdateTaskDto): Promise<TaskDto | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.updateTaskById(taskId, dto));
    } catch (err) {
      if (err.errorType === 'ValidationError') {
        const error = err.value as ValidationError;
        this.logger.error(error.toString());

        return error.toString();
      }

      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update status task by id',
  })
  @Put(':id/updatestatus')
  @HttpCode(HttpStatus.CREATED)
  public async updateStatusTask(@Param('id', ParseIntPipe) taskId: number, @Body() dto: StatusTaskDto): Promise<TaskDto | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.updateStatusTask(taskId, dto.statusTask));
    } catch (err) {
      if (err.errorType === 'ValidationError') {
        const error = err.value as ValidationError;
        this.logger.error(error.toString());

        return error.toString();
      }

      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Choose the task performer by id',
  })
  @Put(':id/chooseperformer')
  @HttpCode(HttpStatus.OK)
  async choosePerformerById(@Param('id', ParseIntPipe) taskId: number, @Body() dto: ChoosePerformeruserIdDto) {
    // ЗДЕСЬ НАДО ЛОГИКУ ПО ИЗМЕНЕНИЮ СТАТУСОВ ЗАДАЧИ ПРИ ДОБАВЛЕНИИ ИЛИ УДАЛЕНИИ ИСПОЛНИТЕЛЯ

    try {
      return fillDTO(TaskDto, await this.taskService.choosePerformerUserIdToTaskById(taskId, dto));
    } catch (err) {
      if (err.errorType === 'ValidationError') {
        const error = err.value as ValidationError;
        this.logger.error(error.toString());

        return error.toString();
      }

      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add reply to task by id',
  })
  @Put(':id/addreply')
  @HttpCode(HttpStatus.CREATED)
  public async addReplyToTask(@Param('id', ParseIntPipe) taskId: number, @Body() dto: ReplyPerformerUserIdDto): Promise<TaskDto | string> {
    try {
      return fillDTO(TaskDto, await this.taskService.addReplyPerformerUserIdToTaskById(taskId, dto));
    } catch (err) {
      if (err.errorType === 'ValidationError') {
        const error = err.value as ValidationError;
        this.logger.error(error.toString());

        return error.toString();
      }

      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete task by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<string> {
    try {
      await this.taskService.deleteTaskById(taskId);

      return `Delete task with id: ${taskId} is succussful`;
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }
}
