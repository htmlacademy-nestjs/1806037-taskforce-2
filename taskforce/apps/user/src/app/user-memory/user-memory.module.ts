import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './user-memory.repository';

@Module({
  imports: [],
  providers: [UserMemoryRepository],
  exports: [UserMemoryRepository],
})
export class UserMemoryModule {}
