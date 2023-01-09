import { Injectable } from '@nestjs/common';
import { ReviewEntity } from '../review-repository/entities/review.entity';
import { ReviewRepository } from '../review-repository/review.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor (
    private readonly reviewRepository: ReviewRepository,
  ) { }

  public async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const reviewEntity = new ReviewEntity().fillEntity(dto);

    return this.reviewRepository.create(reviewEntity);
  }

  public async getAllReviewByUserId(userId: string): Promise<ReviewEntity[]> {
    return await this.reviewRepository.findAllReviewByUserId(userId);
  }

}
