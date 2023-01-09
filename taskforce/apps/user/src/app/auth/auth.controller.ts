import { Controller, Post, HttpCode, HttpStatus, Body, LoggerService, Logger, UseGuards, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AllExceptionsFilter, fillDTO, handleError } from '@taskforce/core';
import { AuthService } from './auth.service';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtAccessTokenDto } from './dto/jwt-access-token.dto';
import { RefreshTokenMeta } from './metadata/refresh-token.metadata';
import { LogoutMeta } from './metadata/logout.metadata';

@ApiTags('auth')
@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  constructor (
    private readonly authService: AuthService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfull created'
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    return fillDTO(UserDto,
      await this.authService.register(dto)
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has logged in'
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthUserDto) {
    return fillDTO(JwtTokensDto,
      await this.authService.login(dto)
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request for a new token based on the refresh token'
  })
  @RefreshTokenMeta()
  @UseGuards(JwtAuthGuard)
  @Post('refreshtoken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.headers['authorization'].split(' ')[1];

    return fillDTO(JwtAccessTokenDto,
      await this.authService.refreshToken(refreshToken)
              .catch(err => handleError(err))
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged out'
  })
  @LogoutMeta()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const authId = req.user['authId'];
    await this.authService.logout(authId)
            .catch(err => handleError(err));

    return 'OK';
  }
}
