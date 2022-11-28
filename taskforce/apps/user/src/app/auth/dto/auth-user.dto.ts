import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    required: true,
  })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public email!: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public password!: string;
}
