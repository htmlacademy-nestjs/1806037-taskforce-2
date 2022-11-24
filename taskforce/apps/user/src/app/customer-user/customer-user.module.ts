import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './customer-user-memory.repository';

@Module({
  imports: [],
  providers: [UserMemoryRepository],
  exports: [UserMemoryRepository],
})
export class CustomerUserModule {}
