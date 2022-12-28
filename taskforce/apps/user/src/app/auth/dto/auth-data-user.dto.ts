import { Expose } from "class-transformer";
import { IsDate, IsEmail, IsMongoId, IsString } from "class-validator";

export class AuthDataUserDto {
  @Expose()
  @IsMongoId()
  public userId: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsString()
  public refreshToken: string;
}
