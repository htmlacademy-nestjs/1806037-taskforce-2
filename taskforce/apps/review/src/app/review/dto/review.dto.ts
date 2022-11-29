import { Expose } from 'class-transformer';

export class ReviewDto {
  @Expose({name: '_id'})
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
