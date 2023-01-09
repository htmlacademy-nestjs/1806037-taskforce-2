import { ApiProperty } from '@nestjs/swagger';
import { CurrentDateValidator } from '@taskforce/core';
import { Expose } from 'class-transformer';
import { IsArray, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength, Validate } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public userId!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(20, {
    message: 'The «title» field must be at least 20 characters long',
  })
  @MaxLength(100, {
    message: 'The «title» field must be no more than 100 characters',
  })
  @IsDefined()
  title!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(100, {
    message: 'The «description» field must be at least 100 characters long',
  })
  @MaxLength(1024, {
    message: 'The «description» field must be no more than 1024 characters',
  })
  @IsDefined()
  description!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsDefined()
  category!: string;

  @ApiProperty()
  @Expose()
  @IsInt()
  @Min(0)
  price?: number;

  @ApiProperty()
  @Expose()
  @Validate(CurrentDateValidator, {
    message: 'Invalid Date'
  })
  lifeTime?: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  image?: string;

  @ApiProperty()
  @Expose()
  address?: string;

  @ApiProperty()
  @Expose()
  @IsArray()
  tags?: string[];
}
