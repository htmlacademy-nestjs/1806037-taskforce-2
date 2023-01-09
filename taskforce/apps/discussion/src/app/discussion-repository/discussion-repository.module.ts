import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionRepository } from './discussion.repository';
import { CommentEntity, CommentEntitySchema } from './entity/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentEntity.name, schema: CommentEntitySchema },
    ]),
  ],
  providers: [DiscussionRepository],
  exports: [DiscussionRepository],
})
export class DiscussionRepositoryModule {}
