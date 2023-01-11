import { Module } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewEntity, ReviewEntitySchema } from './entities/review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: ReviewEntity.name, schema: ReviewEntitySchema },
  ]),
],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewRepositoryModule {}
