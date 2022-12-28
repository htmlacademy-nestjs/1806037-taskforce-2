import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../config/jwt.config';
import { UserRepositoryModule } from '../user-repository/user-repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AuthTokenVerificationService } from './auth-token-verification.service';

@Module({
  imports: [
    UserRepositoryModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenVerificationService, JwtStrategy],
})
export class AuthModule {}
