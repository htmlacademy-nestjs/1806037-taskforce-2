import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class JwtTokensDto {
  @ApiProperty({
    description: 'JWT AccessToken',
  })
  @Expose()
  public access_token: string;

  @ApiProperty({
    description: 'JWT RefreshToken',
  })
  @Expose()
  public refresh_token: string;
}
