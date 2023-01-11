import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter, fillDTO, fillObject, handleError } from '@taskforce/core';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { TaskCategoryRdo } from './rdo/task-category.rdo';
import { TaskCategoryService } from './task-category.service';

@ApiTags('categories')
@Controller('categories')
@UseFilters(AllExceptionsFilter)
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
    return fillObject(
      TaskCategoryRdo,
      await this.taskCategoryService.getAll()
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task category by id',
  })
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) categoryId: number) {
    return fillObject(
      TaskCategoryRdo,
      await this.taskCategoryService.getById(categoryId)
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new task category',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskCategoryDto) {
    return fillDTO(
      TaskCategoryRdo,
      await this.taskCategoryService.create(dto)
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete task category by id',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) categoryId: number) {
    await this.taskCategoryService.delete(categoryId)
            .catch(err => handleError(err));

    return `Delete category with id: ${categoryId} is successful`;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update task category by id',
  })
  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseIntPipe) categoryId: number, @Body() dto: UpdateTaskCategoryDto) {
    return fillObject(
      TaskCategoryRdo,
      await this.taskCategoryService.update(categoryId, dto)
              .catch(err => handleError(err))
    );
  }

}
