import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class SendMessageDto {
  @Expose()
  @IsEmail()
  public recipient: string;

  @Expose()
  @IsEmail()
  public sender: string;

  @Expose()
  @IsString()
  public text: string;
}
