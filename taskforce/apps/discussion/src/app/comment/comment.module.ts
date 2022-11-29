import { Module } from '@nestjs/common';
import { DiscussionMemoryModule } from '../discussion-memory/discussion-memory.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [DiscussionMemoryModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
