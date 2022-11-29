import { ApiProperty } from '@nestjs/swagger';
import { CustomNumberValidator } from '@taskforce/core';
import { Expose } from 'class-transformer';
import { IsString, IsDefined, MinLength, MaxLength, IsNumberString, Min, Max, IsInt, Validate } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    required: true,
    description: 'Review text',
  })
  // @Expose()
  @IsString()
  @MinLength(50, {
    message: 'Review text is shorter than 50 characters'
  })
  @MaxLength(500, {
    message: 'Review text is longer than 500 characters'
  })
  @IsDefined()
  public review: string;

  @ApiProperty({
    required: true,
    description: 'Task ID for current review',
  })
  // @Expose()
  @IsString()
  @IsDefined()
  public taskId: string;

  @ApiProperty({
    required: true,
    description: 'Creator ID review',
  })
  // @Expose()
  @IsString()
  @IsDefined()
  public userId: string;

  @ApiProperty({
    required: true,
    description: 'Score for current review',
  })
  @Validate(CustomNumberValidator, {
    message: 'Current value must be an integer, not less than 1 and not more than 5'
  })
  @IsDefined()
  public score: number;
}
