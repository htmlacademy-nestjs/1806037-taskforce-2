import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGINATION_COUNT } from '../../assets/constants';
import { DiscussionMemoryRepository } from '../discussion-memory/discussion-memory.repository';
import { CommentEntity } from '../discussion-memory/entities/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor (
    private readonly discussRepository: DiscussionMemoryRepository,
  ) { }

  public async create(dto: CreateCommentDto): Promise<CommentEntity> {
    const comment = new CommentEntity(dto);

    return await this.discussRepository.create(comment);
  }

  public async getComments(paginationCount?: number) {
    if (paginationCount) {
      return await this.discussRepository.find(paginationCount);
    }

    return await this.discussRepository.find(DEFAULT_PAGINATION_COUNT);
  }

  public async getComment(commentId: string): Promise<CommentEntity | null> {
    const existComment = await this.discussRepository.findById(commentId);

    if (!existComment) {
      return null;
    }

    return existComment;
  }

  public async delete(commentId: string): Promise<void | null> {
    const existComment = await this.discussRepository.findById(commentId);

    if (!existComment) {
      return null;
    }

    return await this.discussRepository.delete(commentId);
  }

}
