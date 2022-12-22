import { IsMongoId, IsString } from "class-validator";

export class ReplyPerformerUserIdDto {
  @IsString()
  // @IsMongoId()  // Пока для тестов отключил
  userId: string;
}
