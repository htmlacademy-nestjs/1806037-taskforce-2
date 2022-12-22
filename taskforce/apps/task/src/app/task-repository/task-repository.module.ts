import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskCategoryRepository } from './task-category.repository';
import { TaskRepository } from './task.repository';

@Module({
  imports: [PrismaModule],
  providers: [TaskRepository, TaskCategoryRepository],
  exports: [TaskRepository, TaskCategoryRepository],
})
export class TaskRepositoryModule {}
