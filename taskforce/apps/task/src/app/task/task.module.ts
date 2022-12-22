import { Module } from '@nestjs/common';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { TaskRepositoryModule } from '../task-repository/task-repository.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TaskRepositoryModule, TaskCategoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
