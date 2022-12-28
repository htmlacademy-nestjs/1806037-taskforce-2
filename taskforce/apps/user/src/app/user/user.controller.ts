import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { MongoIdValidationPipe, UserRoleEnum } from '@taskforce/shared-types';
import { validate } from 'class-validator';
import { UpdateUserDtoType } from '../../assets/type/types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdateCustomerUserDto } from './dto/update-customer-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UpdatePerformerUserDto } from './dto/update-performer-user.dto';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger: LoggerService = new Logger(UserController.name);

  constructor (
    private readonly userService: UserService
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Getting a user by id'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id', MongoIdValidationPipe) id: string) {
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
  @UseGuards(JwtAuthGuard)
  @Put(':id/updatepassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePasswordUserById(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdatePasswordUserDto) {
    try {
      return await this.userService.updatePassword(id, dto);
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes()
  async updateUserById(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdateUserDtoType) {
    const { role } = await this.getUserById(id) as CustomerUserDto | PerformerUserDto;

    let updateUserData: UpdateUserDtoType;
    if (role === UserRoleEnum.Customer) {
      updateUserData = fillDTO(UpdateCustomerUserDto, dto);
      console.log(updateUserData);
    }
    if (role === UserRoleEnum.Performer) {
      updateUserData = fillDTO(UpdatePerformerUserDto, dto);
    }

    const errors = await validate(updateUserData, { skipMissingProperties: true });

    try {
      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      const existUser = await this.userService.updateUserById(id, updateUserData);

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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteuserById(@Param('id', MongoIdValidationPipe) id: string) {
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
