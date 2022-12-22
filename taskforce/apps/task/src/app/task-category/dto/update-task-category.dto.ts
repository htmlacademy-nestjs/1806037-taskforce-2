import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskCategoryDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;
}
