import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TaskMemoryModule } from './task-memory/task-memory.module';

@Module({
  imports: [TaskModule, TaskMemoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
