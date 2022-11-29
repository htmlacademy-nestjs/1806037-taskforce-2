import * as crypto from 'crypto';
import * as dayjs from 'dayjs';

import { Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from '@taskforce/core';
import { ReviewDto } from "../review/dto/review.dto";
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewMemoryRepository implements CRUDRepositoryInterface<ReviewEntity, string, ReviewDto> {
  private reviewRepository: object = {};

  create(item: ReviewEntity): Promise<ReviewDto> {
    const id = crypto.randomUUID();

    this.reviewRepository[id] = { _id: id, ...item.isObject(), rating: crypto.randomInt(1, 5), createdAt: dayjs().toDate() };

    return this.reviewRepository[id];
  }

  findById(id: string): Promise<ReviewDto> {
    return this.reviewRepository[id];
  }

  update(id: string, item: ReviewEntity): Promise<ReviewDto> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
