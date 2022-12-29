import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from '../assets/constant/constants';
import { validateEnvironments } from '../assets/validation/env.validation';
import { getMongoDbConfig } from '../config/connect-mongodb.config';
import { jwtConfig } from '../config/jwt.config';
import { mongoDbConfig } from '../config/mongodb.config';
import { AuthModule } from './auth/auth.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { UserModule } from './user/user.module';
import { AuthRepositoryModule } from './auth-repository/auth-repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongoDbConfig, jwtConfig],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserRepositoryModule,
    AuthModule,
    UserModule,
    AuthRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
