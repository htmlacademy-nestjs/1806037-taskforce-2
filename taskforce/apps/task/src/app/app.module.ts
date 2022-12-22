import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskRepositoryModule } from './task-repository/task-repository.module';
import { TaskCategoryModule } from './task-category/task-category.module';

@Module({
  imports: [PrismaModule, TaskRepositoryModule, TaskModule, TaskCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
