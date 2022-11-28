import { UserRoleEnum } from "@taskforce/shared-types";
import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { AdultDateValidator } from "@taskforce/core";

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq emaol of user',
    required: true,
    example: 'zhora@yahoo.com'
  })
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(6, {
    message: 'Password is shorter than 6 characters'
  })
  @MaxLength(12, {
    message: 'Password is longer than 12 characters'
  })
  @IsDefined()
  public password: string;

  @ApiProperty({
    required: true,
    enum: UserRoleEnum,
  })
  @IsEnum(UserRoleEnum, {
    message: `'Customer' or 'Performer'`
  })
  @IsDefined()
  public role: keyof typeof UserRoleEnum;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(3, {
    message: 'Firstname is shorter than 3 characters'
  })
  @MaxLength(50, {
    message: 'Password is longer than 50 characters'
  })
  @IsDefined()
  public firstname: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(3, {
    message: 'Firstname is shorter than 3 characters'
  })
  @MaxLength(50, {
    message: 'Password is longer than 50 characters'
  })
  @IsDefined()
  public lastname: string;

  @ApiProperty({
    required: true,
  })
  @Validate(AdultDateValidator, {
    message: 'The user is under 18 years of age'
  })
  @IsDefined()
  public dateBirth: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  // @IsEnum() ---- ТУТ НУЖЕН СПИСОК ГОРОДОВ
  @IsDefined()
  public city: string;

  @ApiProperty()
  @IsString() // ЗДЕСЬ ВАЛИДАЦИЯ ПРИ ЗАГРУЗКЕ ФАЙЛА
  public avatar?: string;
}
