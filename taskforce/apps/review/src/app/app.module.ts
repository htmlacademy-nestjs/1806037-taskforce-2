import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { reviewValidateEnvironments } from '../assets/validate/review-env.validate';
import { getReviewMongoDbConfig } from '../config/get-review-mongodb.config';
import { ReviewRepositoryModule } from './review-repository/review-repository.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: './apps/review/src/environments/.reviews.env',
      validate: reviewValidateEnvironments,
    }),
    MongooseModule.forRootAsync(getReviewMongoDbConfig()),
    ReviewRepositoryModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
