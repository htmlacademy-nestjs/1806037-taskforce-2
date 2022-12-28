import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO, fillObject } from '@taskforce/core';
import { validate } from 'class-validator';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { TaskCategoryRdo } from './rdo/task-category.rdo';
import { TaskCategoryService } from './task-category.service';

@ApiTags('categories')
@Controller('categories')
export class TaskCategoryController {
  private readonly logger: LoggerService = new Logger(TaskCategoryController.name);

  constructor(
    private readonly taskCategoryService: TaskCategoryService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task categories',
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    try {
      return fillObject(TaskCategoryRdo, await this.taskCategoryService.getAll());
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task category by id',
  })
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) categoryId: number) {
    try {
      return fillObject(TaskCategoryRdo, await this.taskCategoryService.getById(categoryId));
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }

  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new task category',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskCategoryDto) {
    const newCategory = fillObject(CreateTaskCategoryDto, dto);
    const errors = await validate(newCategory);

    try {
      if (errors.length > 0) {
        throw errors;
      }

      return fillDTO(TaskCategoryRdo, await this.taskCategoryService.create(newCategory));
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete task category by id',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) categoryId: number) {
    try {
      await this.taskCategoryService.delete(categoryId);

      return `Delete category with id: ${categoryId} is successful`;
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update task category by id',
  })
  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseIntPipe) categoryId: number, @Body() dto: UpdateTaskCategoryDto) {
    const updateCategory = fillObject(UpdateTaskCategoryDto, dto);
    const errors = await validate(updateCategory);

    try {
      if (errors.length > 0) {
        throw errors;
      }

      return fillObject(TaskCategoryRdo, await this.taskCategoryService.update(categoryId, updateCategory));
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      return error.message;
    }
  }

}
