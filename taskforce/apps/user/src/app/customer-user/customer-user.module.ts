import { Module } from '@nestjs/common';
import { CustomerUserMemoryRepository } from './customer-user-memory.repository';

@Module({
  imports: [],
  providers: [CustomerUserMemoryRepository],
  exports: [CustomerUserMemoryRepository],
})
export class CustomerUserModule {}
