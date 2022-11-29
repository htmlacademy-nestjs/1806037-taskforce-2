import { Injectable } from '@nestjs/common';
import { ReviewEntity } from '../review-memory/entities/review.entity';
import { ReviewMemoryRepository } from '../review-memory/review-memory.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor (
    private readonly reviewRepository: ReviewMemoryRepository,
  ) { }

  public async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const reviewEntity = new ReviewEntity(dto);

    return this.reviewRepository.create(reviewEntity);
  }

  public async delete(commentId: string): Promise<void | null> {
    const existComment = await this.reviewRepository.findById(commentId);

    if (!existComment) {
      return null;
    }

    return await this.reviewRepository.delete(commentId);
  }

}
