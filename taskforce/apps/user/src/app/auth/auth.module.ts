import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../config/jwt.config';
import { UserRepositoryModule } from '../user-repository/user-repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AuthTokenVerificationService } from './auth-token-verification.service';
import { AuthRepositoryModule } from '../auth-repository/auth-repository.module';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfigForUserModule } from '../../config/rabbitmq.config';

@Module({
  imports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        inject: [ConfigService],
        useFactory: getRabbitMqConfigForUserModule,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenVerificationService, JwtStrategy],
})
export class AuthModule {}
