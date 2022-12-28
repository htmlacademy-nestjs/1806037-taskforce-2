import { Controller, Post, HttpCode, HttpStatus, Body, LoggerService, Logger, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { AuthService } from './auth.service';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshTokenDto } from './dto/jwt-refresh-token.dto';
import { JwtAccessTokenDto } from './dto/jwt-access-token.dto';

@ApiTags('auth')
@Controller('auth')
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
    try {
      return fillDTO(UserDto, await this.authService.register(dto));
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has logged in'
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthUserDto) {
    try {
      return fillDTO(JwtTokensDto, await this.authService.login(dto));
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged out'
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    try {
      await this.authService.logout(token);

      return 'OK';
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  // TODO
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Find user by ID',
  // })
  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async getById(@Param('id', MongoIdValidationPipe) id: string) {
  //   try {
  //     return fillDTO(UserDto, await this.authService.getUserById(id));
  //   } catch (error) {
  //     const err = error as Error;
  //     this.logger.error(err.message, err.stack);
  //     return err.message;
  //   }
  // }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request for a new token based on the refresh token'
  })
  @UseGuards(JwtAuthGuard)
  @Post('refreshtoken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: JwtRefreshTokenDto) {
    try {
      return fillDTO(JwtAccessTokenDto, await this.authService.refreshToken(dto));
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

}
