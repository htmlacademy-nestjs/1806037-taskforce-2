import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DISCUSSION_ENV_FILE_PATH } from '../assets/constant/constants';
import { validateDiscussionEnvironments } from '../assets/validation/discussions-env.validation';
import { getDiscussionMongoDbConfig } from '../config/get-discussions-mongodb.config';
import { CommentModule } from './comment/comment.module';
import { DiscussionRepositoryModule } from './discussion-repository/discussion-repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: DISCUSSION_ENV_FILE_PATH,
      validate: validateDiscussionEnvironments,
    }),
    MongooseModule.forRootAsync(getDiscussionMongoDbConfig()),
    CommentModule,
    DiscussionRepositoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
