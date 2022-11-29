import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentDto {
  @ApiProperty({
    description: 'The unique comment id'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Task Id'
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'User id'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Comment text'
  })
  @Expose()
  public comment: string;

  @ApiProperty({
    description: 'Creation time'
  })
  @Expose()
  public createdAt: string;
}
