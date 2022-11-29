import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { DiscussionMemoryModule } from './discussion-memory/discussion-memory.module';

@Module({
  imports: [CommentModule, DiscussionMemoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
