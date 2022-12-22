import { Expose } from "class-transformer";

export class TaskCategoryRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public tasks: string[];
}
