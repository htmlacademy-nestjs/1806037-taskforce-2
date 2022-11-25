import { Module } from '@nestjs/common';
import { UserMemoryModule } from '../user-memory/user-memory.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserMemoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
