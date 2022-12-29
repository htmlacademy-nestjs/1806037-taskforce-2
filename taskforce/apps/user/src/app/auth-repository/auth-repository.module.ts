import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';
import { AuthUserEntity, AuthUserSchema } from './entity/auth-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthUserEntity.name, schema: AuthUserSchema },
    ]),
  ],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthRepositoryModule {}
