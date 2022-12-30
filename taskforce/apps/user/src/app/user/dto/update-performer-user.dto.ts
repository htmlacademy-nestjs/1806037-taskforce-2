import { ApiProperty } from "@nestjs/swagger";
import { AdultDateValidator } from "@taskforce/core";
import { Expose } from "class-transformer";
import { ArrayMaxSize, IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class UpdatePerformerUserDto {
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
  @IsString()
  @MinLength(3, {
    message: 'Lastname is shorter than 3 characters'
  })
  @MaxLength(50, {
    message: 'Lastname is longer than 50 characters'
  })
  public lastname: string;

  @ApiProperty()
  @Expose()
  @Validate(AdultDateValidator, {
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

  @ApiProperty()
  @Expose()
  @ArrayMaxSize(5, {
    message: 'Specilization Array contains more than 5 entries'
  })
  public specilization: string[];
}
