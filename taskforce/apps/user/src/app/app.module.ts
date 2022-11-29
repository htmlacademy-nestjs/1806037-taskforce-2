import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserMemoryModule } from './user-memory/user-memory.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserMemoryModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
