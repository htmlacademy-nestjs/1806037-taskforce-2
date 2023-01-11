import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class NotifySubscriberAboutNewTaskDto {
  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsString()
  public username: string;

  @Expose()
  @IsString()
  public taskTitle: string;
}
