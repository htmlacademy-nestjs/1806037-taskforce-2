import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
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

  constructor (
    private  readonly authService: AuthService
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfull created'
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = plainToInstance(CreateUserDto, dto);
    const errors = await validate(newUser);
    if (errors.length > 0) {
      return errors;
    }

    return fillDTO(UserDto, await this.authService.register(dto));
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has logged in'
  })
  async login(@Body() dto: AuthUserDto) {
    const user = plainToInstance(AuthUserDto, dto);
    const errors = await validate(user);

    if (errors.length > 0) {
      return errors;
    }

    return fillDTO(UserDto, await this.authService.verifyUser(user));
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged out'
  })
  async logout() {
    return await this.authService.logout();
  }
}
