import { Module } from '@nestjs/common';
import { UserMemoryModule } from '../user-memory/user-memory.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserMemoryModule, UserModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
