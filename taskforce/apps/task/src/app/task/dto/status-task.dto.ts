import { ApiProperty } from "@nestjs/swagger";
import { TaskStatusEnum } from "@taskforce/shared-types";
import { Expose } from "class-transformer";
import { IsDefined, IsEnum } from "class-validator";

export class StatusTaskDto {
  @ApiProperty({
    required: true,
    readOnly: true,
    enum: TaskStatusEnum,
  })
  @Expose()
  @IsEnum(TaskStatusEnum)
  @IsDefined()
  public statusTask: keyof typeof TaskStatusEnum;
}
