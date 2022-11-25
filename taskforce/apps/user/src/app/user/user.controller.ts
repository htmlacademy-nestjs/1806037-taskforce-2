import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { fillDTO } from '@taskforce/core';
import { UserRoleEnum } from '@taskforce/shared-types';
import { validate } from 'class-validator';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) { }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    const existUser = await this.userService.findUserById(id);

    if (typeof existUser === 'string') {
      return existUser;
    }

    if (existUser.role === UserRoleEnum.Customer) {
      return fillDTO(CustomerUserDto, existUser);
    }
    if (existUser.role === UserRoleEnum.Performer) {
      return fillDTO(PerformerUserDto, existUser);
    }
  }

  @Post(':id/updatepassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePasswordUserById(@Param('id') id: string, @Body() dto: UpdatePasswordUserDto) {
    const updatePasswordObj = fillDTO(UpdatePasswordUserDto, dto);
    const errors = await validate(updatePasswordObj);

    if (errors.length > 0) {
      return errors;
    }

    return await this.userService.updatePasswordUserById(id, updatePasswordObj);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateUserById(@Param('id') id: string, @Body() dto: any) {
    return await this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteuserById(@Param() id: string) {
    return await this.userService.deleteUserById(id);
  }
}
