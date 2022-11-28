import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty()
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty()
  @Expose()
  public status: string;

  @ApiProperty()
  @Expose({name: 'repliedPerformers'})
  public repliedPerformers: any[];

  @ApiProperty()
  @Expose()
  public createdAt: Date;

  @ApiProperty()
  @Expose()
  public updatedAt: Date[];
}
