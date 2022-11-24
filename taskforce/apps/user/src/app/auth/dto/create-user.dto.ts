import { UserRole } from "@taskforce/shared-types";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq emaol of user',
    required: true,
    example: 'zhora@yahoo.com'
  })
  public email: string;

  @ApiProperty({
    required: true,
  })
  public password: string;

  @ApiProperty({
    required: true,
    enum: UserRole,
  })
  public role: keyof typeof UserRole;

  @ApiProperty({
    required: true,
  })
  public firstname: string;

  @ApiProperty({
    required: true,
  })
  public lastname: string;

  @ApiProperty({
    required: true,
  })
  public dateBirth: string;

  @ApiProperty({
    required: true,
  })
  public city: string;

  @ApiProperty()
  public avatar?: string;
}
