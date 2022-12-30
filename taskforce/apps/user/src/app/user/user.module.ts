import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserRepositoryModule } from '../user-repository/user-repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserRepositoryModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
