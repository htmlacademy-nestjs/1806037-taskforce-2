import { Module } from '@nestjs/common';
import { TaskRepositoryModule } from '../task-repository/task-repository.module';
import { TaskCategoryController } from './task-category.controller';
import { TaskCategoryService } from './task-category.service';

@Module({
  imports: [TaskRepositoryModule],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
  exports: [TaskCategoryService],
})
export class TaskCategoryModule {}
