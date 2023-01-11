import * as crypto from 'crypto';
import * as dayjs from 'dayjs';

import { Injectable } from "@nestjs/common";
import { CommentEntity } from "./entity/comment.entity";
import { DEFAULT_COMMENT_COUNT } from '../../assets/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentQuery } from '../comment/query/comment.query';

@Injectable()
export class DiscussionRepository {
  private discussRepository: object = {};

  constructor (
    @InjectModel(CommentEntity.name) private readonly commentModel: Model<CommentEntity>,
  ) { }

  public async create(item: CommentEntity): Promise<CommentEntity> {
    const commentEntityModel = new this.commentModel(item);

    return await commentEntityModel.save();
  }

  public async find(query: CommentQuery): Promise<CommentEntity[]> {
    const { limit, page } = query;

    return await this.commentModel.find().limit(limit).skip(limit * (page - 1));
  }

  public async findById(id: string): Promise<CommentEntity> {
    return await this.commentModel.findById(id);
  }

  public async delete(id: string): Promise<CommentEntity> {
    return await this.commentModel.findByIdAndDelete(id);
  }

}
