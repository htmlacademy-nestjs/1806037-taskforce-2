import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PerformerUserDto {
  @ApiProperty()
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public role: string;

  @ApiProperty()
  @Expose()
  public firstname: string;

  @ApiProperty()
  @Expose()
  public age: number;

  @ApiProperty({
    required: true,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    required: true,
  })
  @Expose()
  public city: string;

  @ApiProperty()
  @Expose()
  public rating: number;

  @ApiProperty()
  @Expose()
  public successTasksCount: number;

  @ApiProperty()
  @Expose()
  public failTasksCount: number;

  @ApiProperty()
  @Expose()
  public specialization: string[];

  @ApiProperty()
  @Expose()
  public ratingPlace: number;

  @ApiProperty()
  @Expose()
  public createdAt: Date;
}
