import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Put, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter, fillDTO, handleError } from '@taskforce/core';
import { MongoIdValidationPipe, UserRoleEnum } from '@taskforce/shared-types';
import { validate, ValidationError } from 'class-validator';
import { UpdateUserDtoType, UserEntityType } from '../../assets/type/types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdateCustomerUserDto } from './dto/update-customer-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UpdatePerformerUserDto } from './dto/update-performer-user.dto';
import { UserService } from './user.service';


@ApiTags('users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
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
    const existUser = await this.userService.findUserById(id)
                        .catch(err => handleError(err)) as UserEntityType;

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
  @UseGuards(JwtAuthGuard)
  @Put(':id/updatepassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePasswordUserById(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdatePasswordUserDto) {
    return await this.userService.updatePassword(id, dto)
                  .catch(err => handleError(err));
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
    const { role } = await this.getUserById(id)
                      .catch(err => handleError(err)) as CustomerUserDto | PerformerUserDto;

    let updateUserData: UpdateUserDtoType;
    if (role === UserRoleEnum.Customer) {
      updateUserData = fillDTO(UpdateCustomerUserDto, dto);
      console.log(updateUserData);
    }
    if (role === UserRoleEnum.Performer) {
      updateUserData = fillDTO(UpdatePerformerUserDto, dto);
    }

    await validate(updateUserData, { skipMissingProperties: true })
      .then(errors => {
        if (errors.length > 0)
          throw errors;
      })
      .catch(err => handleError(err)) as unknown as ValidationError[];

    const existUser = await this.userService.updateUserById(id, updateUserData)
                                .catch(err => handleError(err)) as UserEntityType;

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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteuserById(@Param('id', MongoIdValidationPipe) id: string) {
    await this.userService.deleteUserById(id)
            .catch(err => handleError(err));

    return 'Delete is complete.'
  }
}
