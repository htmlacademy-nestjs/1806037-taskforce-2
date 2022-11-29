import { ReviewInterface } from '@taskforce/shared-types';
import { CreateReviewDto } from '../../review/dto/create-review.dto';

export class ReviewEntity implements ReviewInterface {
  public _id: string;

  public review: string;

  public taskId: string;

  public score: number;

  public userId: string;

  public rating: number;

  public createdAt: Date;

  constructor (dto: CreateReviewDto) {
    this.fillEntity(dto);
  }

  private fillEntity(dto: CreateReviewDto) {
    const { review, taskId, score, userId } = dto;

    this.review = review;
    this.taskId = taskId;
    this.score = score;
    this.userId = userId;
  }

  public isObject() {
    return { ...this };
  }

}
