import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ReviewInterface } from '@taskforce/shared-types';
import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { CreateReviewDto } from '../../review/dto/create-review.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReviewEntity extends Document { }

@Schema({
  collection: 'reviews',
  timestamps: true,
})
export class ReviewEntity implements ReviewInterface, ReviewEntity {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
    unique: true,
  })
  public taskId: string;

  @Prop({
    required: true,
  })
  public review: string;

  @Prop({
    required: true,
  })
  public score: number;
  @Prop()
  public rating: number;

  public fillEntity(dto: CreateReviewDto) {
    const { review, taskId, score, userId } = dto;

    this.review = review;
    this.taskId = taskId;
    this.score = score;
    this.userId = userId;

    return this;
  }
}

export const ReviewEntitySchema = SchemaFactory.createForClass(ReviewEntity);
