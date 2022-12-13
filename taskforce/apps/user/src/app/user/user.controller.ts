import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { UserRoleEnum } from '@taskforce/shared-types';
import { validate } from 'class-validator';
import { UpdateUserDtoType } from '../../assets/type/types';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdateCustomerUserDto } from './dto/update-customer-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UpdatePerformerUserDto } from './dto/update-performer-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger: LoggerService = new Logger(UserController.name);

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
    try {
      const existUser = await this.userService.findUserById(id);

      if (existUser.role === UserRoleEnum.Customer) {
        return fillDTO(CustomerUserDto, existUser);
      }
      if (existUser.role === UserRoleEnum.Performer) {
        return fillDTO(PerformerUserDto, existUser);
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updating the user password by id'
  })
  @Put(':id/updatepassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePasswordUserById(@Param('id') id: string, @Body() dto: UpdatePasswordUserDto) {
    const updatePasswordObj = fillDTO(UpdatePasswordUserDto, dto);
    const errors = await validate(updatePasswordObj);

    try {
      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      return await this.userService.updatePassword(id, dto);
      // return 'Password sucessfull updated';
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updating user data by id'
  })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateUserById(@Param('id') id: string, @Body() dto: UpdateUserDtoType) {
    let updateUserData: UpdateUserDtoType;
    if (dto.role === UserRoleEnum.Customer) {
      updateUserData = fillDTO(UpdateCustomerUserDto, dto);
    }
    if (dto.role === UserRoleEnum.Performer) {
      updateUserData = fillDTO(UpdatePerformerUserDto, dto);
    }

    const errors = await validate(updateUserData, { skipMissingProperties: true });

    try {
      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      const existUser = await this.userService.updateUserById(id, dto);

      if (existUser.role === UserRoleEnum.Customer) {
        return fillDTO(CustomerUserDto, existUser);
      }
      if (existUser.role === UserRoleEnum.Performer) {
        return fillDTO(PerformerUserDto, existUser);
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleting a user by id'
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteuserById(@Param('id') id: string) {
    try {
      await this.userService.deleteUserById(id);

      return 'Delete is complete.'
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message, err.stack);
      return err.message;
    }
  }
}
