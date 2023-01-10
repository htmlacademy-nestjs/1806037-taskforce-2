import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateUserModuleEnvironments } from '../assets/validation/env.validation';
import { getUsersMongoDbConfig } from '../config/connect-mongodb.config';
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
      envFilePath: './apps/user/src/environments/.users.env',
      load: [mongoDbConfig, jwtConfig],
      validate: validateUserModuleEnvironments,
    }),
    MongooseModule.forRootAsync(getUsersMongoDbConfig()),
    UserRepositoryModule,
    AuthModule,
    UserModule,
    AuthRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
