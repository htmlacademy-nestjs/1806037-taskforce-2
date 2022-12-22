import { IsMongoId, IsString } from "class-validator";

export class ChoosePerformeruserIdDto {
  @IsString()
  // @IsMongoId()  // Пока для тестов отключил
  userId: string;
}
