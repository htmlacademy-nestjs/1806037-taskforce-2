import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CustomerUserDto {
  @ApiProperty()
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public role: string;

  @ApiProperty()
  @Expose()
  public firstname: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  public city: string;

  @ApiProperty()
  @Expose()
  public publishedTasksCount: number;

  @ApiProperty()
  @Expose()
  public newTasksCount: number;

  @ApiProperty()
  @Expose()
  public createdAt: Date;
}
