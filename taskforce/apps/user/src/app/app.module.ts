import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from '../assets/constant/constants';
import { validateEnvironments } from '../assets/validation/env.validation';
import { getMongoDbConfig } from '../config/connect-mongodb.config';
import mongodbConfig from '../config/mongodb.config';
import { AuthModule } from './auth/auth.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongodbConfig],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserRepositoryModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
