import { Module } from '@nestjs/common';
import { ReviewMemoryModule } from '../review-memory/review-memory.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [ReviewMemoryModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
