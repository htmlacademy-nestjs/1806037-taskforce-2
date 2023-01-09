import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString, IsDefined, MinLength, MaxLength, Min, Max, IsInt } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    required: true,
    description: 'Review text',
  })
  @Expose()
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
    description: 'Creator ID review',
  })
  @Expose()
  @IsString()
  @IsDefined()
  public userId: string;

  @ApiProperty({
    required: true,
    description: 'Task ID for current review',
  })
  @Expose()
  @IsString()
  @IsDefined()
  public taskId: string;

  @ApiProperty({
    required: true,
    description: 'Score for current review',
  })
  @Expose()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  @IsInt()
  public score: number;
}
