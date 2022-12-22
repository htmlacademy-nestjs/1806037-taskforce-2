import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO, fillObject } from '@taskforce/core';
import { CustomErrorType } from '@taskforce/shared-types';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ReplyPerformerUserIdDto } from './dto/reply-performer-userid.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { StatusTaskDto } from './dto/status-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { ChoosePerformeruserIdDto } from './dto/choose-performer-userid.dto';

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
    const newTask = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(newTask, { skipMissingProperties: true });

    try {
      if (errors.length > 0) {
        throw {
          errorType: `ValidationError`,
          value: errors
        };
      }

      return fillDTO(TaskDto, await this.taskService.create(newTask));
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
  public async getTasks(@Query('page') page: number): Promise<TaskDto | TaskDto[] | string> {
    const paginationCount = Number(Number(page).toFixed(0));

    try {
      if (!isNaN(paginationCount) && paginationCount > 1) {
        return fillDTO(TaskDto, await this.taskService.getAll(paginationCount));
      }

      return fillDTO(TaskDto, await this.taskService.getAll());
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
  public async getTask(@Param('id') id: string): Promise<TaskDto | string> {
    const taskId = parseInt(id, 10);

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
  public async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<TaskDto | string> {
    const taskId = parseInt(id, 10);
    const updateTask = plainToInstance(UpdateTaskDto, dto, { exposeUnsetFields: false });
    const errors = await validate(updateTask, { skipMissingProperties: true });

    try {
      if (errors.length > 0) {
        throw {
          errorType: `ValidationError`,
          value: errors
        };
      }

      return fillDTO(TaskDto, await this.taskService.updateTaskById(taskId, updateTask));
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
  public async updateStatusTask(@Param('id') id: string, @Body() dto: StatusTaskDto): Promise<TaskDto | string> {
    const taskId = parseInt(id, 10);
    const targetDto = plainToInstance(StatusTaskDto, dto);
    const errors = await validate(targetDto);

    try {
      if (errors.length > 0) {
        throw {
          errorType: `ValidationError`,
          value: errors
        };
      }

      return fillDTO(TaskDto, await this.taskService.updateStatusTask(taskId, targetDto.statusTask));
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
  async choosePerformerById(@Param('id') id: string, @Body() dto: ChoosePerformeruserIdDto) {
    const taskId = parseInt(id, 10);
    const choosePerformerUserId = plainToInstance(ChoosePerformeruserIdDto, dto);
    const errors = await validate(choosePerformerUserId);


    // ЗДЕСЬ НАДО ЛОГИКУ ПО ИЗМЕНЕНИЮ СТАТУСОВ ЗАДАЧИ ПРИ ДОБАВЛЕНИИ ИЛИ УДАЛЕНИИ ИСПОЛНИТЕЛЯ


    try {
      if (errors.length > 0) {
        throw {
          errorType: `ValidationError`,
          value: errors
        };
      }

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
  public async addReplyToTask(@Param('id') id: string, @Body() dto: ReplyPerformerUserIdDto): Promise<TaskDto | string> {
    const taskId = parseInt(id, 10);
    const replyPerformerUserId = fillObject(ReplyPerformerUserIdDto, dto);
    const errors = await validate(replyPerformerUserId);

    try {
      if (errors.length > 0) {
        throw {
          errorType: `ValidationError`,
          value: errors
        };
      }

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
  public async deleteTask(@Param('id') id: string): Promise<string> {
    const taskId = parseInt(id, 10);

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
