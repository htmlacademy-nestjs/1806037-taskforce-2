import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateEmailSubscriberDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  role: string;
}
