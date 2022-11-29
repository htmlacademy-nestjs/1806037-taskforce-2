import { CommentInterface } from '@taskforce/shared-types';
import { CreateCommentDto } from "../../comment/dto/create-comment.dto";

export class CommentEntity implements CommentInterface {
  public _id: string;

  public taskId: string;

  public comment: string;

  public userId: string;

  public createdAt: Date;

  constructor (dto: CreateCommentDto) {
    this.fillEntity(dto);
  }

  private fillEntity(dto: CreateCommentDto) {
    const { comment, taskId, userId } = dto;

    this.comment = comment;
    this.taskId = taskId;
    this.userId = userId;
  }

  public toObject() {
    return { ...this };
  }
}
