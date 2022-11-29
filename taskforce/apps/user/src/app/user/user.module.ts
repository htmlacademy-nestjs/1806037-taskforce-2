import { Module } from '@nestjs/common';
import { UserMemoryModule } from '../user-memory/user-memory.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserMemoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
