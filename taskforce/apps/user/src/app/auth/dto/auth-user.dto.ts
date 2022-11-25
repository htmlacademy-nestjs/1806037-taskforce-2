import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    required: true,
  })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  public password!: string;
}
