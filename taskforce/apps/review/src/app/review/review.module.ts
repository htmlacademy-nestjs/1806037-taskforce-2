import { Module } from '@nestjs/common';
import { ReviewRepositoryModule } from '../review-repository/review-repository.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [ReviewRepositoryModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
