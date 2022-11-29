import { Module } from '@nestjs/common';
import { ReviewMemoryModule } from './review-memory/review-memory.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ReviewMemoryModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
