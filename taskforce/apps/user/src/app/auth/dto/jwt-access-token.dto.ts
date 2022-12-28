import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsJWT } from "class-validator";

export class JwtAccessTokenDto {
  @ApiProperty({
    description: 'JWT AccessToken',
  })
  @Expose()
  @IsJWT()
  public access_token: string;
}
