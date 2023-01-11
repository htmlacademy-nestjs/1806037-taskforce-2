import { Module } from '@nestjs/common';
import { DiscussionRepositoryModule } from '../discussion-repository/discussion-repository.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [DiscussionRepositoryModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
