import * as crypto from 'crypto';
import * as dayjs from 'dayjs';

import { Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from '@taskforce/core';
import { CommentDto } from "../comment/dto/comment.dto";
import { CommentEntity } from "./entities/comment.entity";
import { DEFAULT_COMMENT_COUNT } from '../../assets/constants';

@Injectable()
export class DiscussionMemoryRepository implements CRUDRepositoryInterface<CommentEntity, string, CommentDto> {
  private discussRepository: object = {};

  public async create(item: CommentEntity): Promise<CommentDto> {
    // const id = 1;
    const id = crypto.randomUUID();

    this.discussRepository[id] = { _id: id, ...item.toObject(), createdAt: dayjs().toDate() };

    return this.discussRepository[id];
  }

  public async find(paginationCount: number): Promise<CommentDto[]> {
    const comments =  Object.values(this.discussRepository);

    return comments.slice((paginationCount - 1) * DEFAULT_COMMENT_COUNT, paginationCount * DEFAULT_COMMENT_COUNT);
  }

  public async findById(id: string): Promise<CommentDto> {
    return this.discussRepository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<CommentDto> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: string): Promise<void> {
    delete this.discussRepository[id];
  }

}
