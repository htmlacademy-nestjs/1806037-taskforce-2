import { Module } from '@nestjs/common';
import { ReviewMemoryRepository } from './review-memory.repository';

@Module({
  providers: [ReviewMemoryRepository],
  exports: [ReviewMemoryRepository],
})
export class ReviewMemoryModule {}
