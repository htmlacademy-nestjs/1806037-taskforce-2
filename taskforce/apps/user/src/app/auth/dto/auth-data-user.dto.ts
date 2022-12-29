import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class AuthDataUserDto {
  @Expose()
  @IsEmail()
  public email: string;
}
