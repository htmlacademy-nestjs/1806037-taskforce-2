import { Expose, Transform } from 'class-transformer';

export class ReviewDto {
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
  public id: string;

  @Expose()
  public review: string;

  @Expose()
  public taskId: string;

  @Expose()
  public score: number;

  @Expose()
  public userId: string;

  @Expose()
  public rating: number;

  @Expose()
  public createdAt: Date;
}
