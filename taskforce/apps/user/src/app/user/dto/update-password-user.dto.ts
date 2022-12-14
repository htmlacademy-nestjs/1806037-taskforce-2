import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDefined, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordUserDto {
  @ApiProperty()
  @Expose({name: 'oldPassword'})
  @IsString()
  @IsDefined()
  public oldPassword: string;

  @ApiProperty()
  @Expose({name: 'newPassword'})
  @IsString()
  @MinLength(6, {
    message: 'Password is shorter than 6 characters',
  })
  @MaxLength(12, {
    message: 'Password is longer than 12 characters'
  })
  @IsDefined()
  public newPassword: string;
}
