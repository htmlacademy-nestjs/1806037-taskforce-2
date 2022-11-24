import { Module } from '@nestjs/common';
import { CustomerUserModule } from '../customer-user/customer-user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CustomerUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
