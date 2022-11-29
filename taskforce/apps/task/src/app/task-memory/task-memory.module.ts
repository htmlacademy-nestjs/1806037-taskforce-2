import { Module } from '@nestjs/common';
import { TaskMemoryRepository } from './task-memory.repository';

@Module({
  providers: [TaskMemoryRepository],
  exports: [TaskMemoryRepository],
})
export class TaskMemoryModule {}
