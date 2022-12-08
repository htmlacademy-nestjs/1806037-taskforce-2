import { Controller, Post, HttpCode, HttpStatus, Body, LoggerService, Logger } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

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
    const newUser = plainToInstance(CreateUserDto, dto);
    const errors = await validate(newUser, { skipMissingProperties: true });

    try {
      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

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
    const user = plainToInstance(AuthUserDto, dto);
    const errors = await validate(user);

    try {
      if (errors.length > 0) {
        return errors;
      }

      return fillDTO(UserDto, await this.authService.verifyUser(user));
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
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return await this.authService.logout();
  }

}
