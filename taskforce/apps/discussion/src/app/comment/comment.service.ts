import { Injectable } from '@nestjs/common';
import { DiscussionRepository } from '../discussion-repository/discussion.repository';
import { CommentEntity } from '../discussion-repository/entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {
  constructor (
    private readonly discussRepository: DiscussionRepository,
  ) { }

  public async create(dto: CreateCommentDto): Promise<CommentEntity> {
    const comment = new CommentEntity().fillEntity(dto);

    return await this.discussRepository.create(comment);
  }

  public async getComments(query: CommentQuery): Promise<CommentEntity[]> {
    return await this.discussRepository.find(query);
  }

  public async getComment(commentId: string): Promise<CommentEntity | null> {
    return await this.discussRepository.findById(commentId);
  }

  public async delete(commentId: string): Promise<CommentEntity> {
    return await this.discussRepository.delete(commentId);
  }

}
