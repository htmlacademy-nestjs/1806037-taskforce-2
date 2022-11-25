import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { UserRoleEnum } from '@taskforce/shared-types';
import { validate } from 'class-validator';
import { UpdateUserDtoType } from '../../assets/types/types';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Getting a user by id'
  })
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

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updating the user password by id'
  })
  @Post(':id/updatepassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePasswordUserById(@Param('id') id: string, @Body() dto: UpdatePasswordUserDto) {
    const updatePasswordObj = fillDTO(UpdatePasswordUserDto, dto);
    const errors = await validate(updatePasswordObj);

    if (errors.length > 0) {
      return errors;
    }

    const existUser = await this.userService.updatePasswordUserById(id, updatePasswordObj);

    if (typeof existUser === 'string') {
      return existUser;
    }

    return 'Password sucessfull updated';
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updating user data by id'
  })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateUserById(@Param('id') id: string, @Body() dto: UpdateUserDtoType) {
    const existUser = await this.userService.updateUserById(id, dto);

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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleting a user by id'
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteuserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}
