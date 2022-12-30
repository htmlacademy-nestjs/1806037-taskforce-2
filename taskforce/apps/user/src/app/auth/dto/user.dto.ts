import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
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

  @ApiProperty()
  @Expose()
  public lastname: string;

  @ApiProperty()
  @Expose()
  public dateBirth: Date;

  @ApiProperty()
  @Expose()
  public city: string;

  @ApiProperty()
  @Expose()
  public avatar?: string;
}
