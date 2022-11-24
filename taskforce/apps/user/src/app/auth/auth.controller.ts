import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { validate } from 'class-validator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
    return await this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = fillDTO(LoginUserDto, dto);
    const errors = await validate(user);

    if (errors.length > 0) {
      return errors;
    }

    return await this.authService.verifyUser(user);
  }
}
