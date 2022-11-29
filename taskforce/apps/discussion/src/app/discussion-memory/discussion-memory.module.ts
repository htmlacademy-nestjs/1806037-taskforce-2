import { Module } from '@nestjs/common';
import { DiscussionMemoryRepository } from './discussion-memory.repository';

@Module({
  providers: [DiscussionMemoryRepository],
  exports: [DiscussionMemoryRepository],
})
export class DiscussionMemoryModule {}
