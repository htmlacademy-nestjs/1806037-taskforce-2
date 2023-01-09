import { CommentInterface } from '@taskforce/shared-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateCommentDto } from "../../comment/dto/create-comment.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CommentEntity extends Document { }

@Schema({
  collection: 'discussions',
  timestamps: true,
})
export class CommentEntity implements CommentInterface {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public taskId: string;

  @Prop({
    required: true,
  })
  public comment: string;

  public fillEntity(dto: CreateCommentDto) {
    const { comment, taskId, userId } = dto;

    this.comment = comment;
    this.taskId = taskId;
    this.userId = userId;

    return this;
  }
}

export const CommentEntitySchema = SchemaFactory.createForClass(CommentEntity);
