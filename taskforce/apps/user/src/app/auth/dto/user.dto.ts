import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public role: string;
}
