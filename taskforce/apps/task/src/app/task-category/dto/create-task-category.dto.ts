import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskCategoryDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;
}
