import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsJWT } from "class-validator";

export class JwtRefreshTokenDto {
  @ApiProperty({
    description: 'JWT RefreshToken',
  })
  @Expose()
  @IsJWT()
  public refresh_token: string;
}
