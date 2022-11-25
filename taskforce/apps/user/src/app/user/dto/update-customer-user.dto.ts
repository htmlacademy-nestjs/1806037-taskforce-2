import { ApiProperty } from "@nestjs/swagger";
import { CustomDateValidator } from "@taskforce/core";
import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class UpdateCustomerUserDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(3, {
    message: 'Firstname is shorter than 3 characters'
  })
  @MaxLength(50, {
    message: 'Password is longer than 50 characters'
  })
  public firstname: string;

  @ApiProperty()
  @Expose()
  @Validate(CustomDateValidator, {
    message: 'The user is under 18 years of age'
  })
  public dateBirth: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MaxLength(300, {
    message: 'Description is longer than 300 characters'
  })
  public description: string;
}
