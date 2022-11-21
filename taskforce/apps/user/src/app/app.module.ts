import { Module } from '@nestjs/common';
import { CustomerUserModule } from './customer-user/customer-user.module';
import { PerformerUserModule } from './performer-user/performer-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CustomerUserModule, PerformerUserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
