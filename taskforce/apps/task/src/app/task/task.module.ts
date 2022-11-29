import { Module } from '@nestjs/common';
import { TaskMemoryModule } from '../task-memory/task-memory.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TaskMemoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
