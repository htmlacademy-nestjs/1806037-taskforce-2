import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { DEFAULT_PAGINATION_COUNT } from '../../assets/constants';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor (
    private readonly commentService: CommentService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Creating a comment',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateCommentDto): Promise<CommentDto | ValidationError[]> {
    const newComment = plainToInstance(CreateCommentDto, dto);
    const errors = await validate(newComment);

    if (errors.length > 0) {
      return errors;
    }

    return fillDTO(CommentDto, await this.commentService.createComment(dto));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getComments(@Query('page') page: string): Promise<CommentDto | CommentDto[]> {
    const paginationCount = Number(Number(page).toFixed(0));

    if (!isNaN(paginationCount) && paginationCount > 1) {
      return fillDTO(CommentDto, await this.commentService.getComments(paginationCount));
    }

    return fillDTO(CommentDto, await this.commentService.getComments());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comment by id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getComment(@Param('id') commentId: string): Promise<CommentDto | string> {
    const result = await this.commentService.getComment(commentId);

    if (result === null) {
      return `Comment with id: ${commentId} is not found`;
    }

    return fillDTO(CommentDto, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete comment by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteComment(@Param('id') commentId: string): Promise<string> {
    const result = await this.commentService.deleteComment(commentId);

    if (result === null) {
      return `Comment with id: ${commentId} is not found`;
    }

    return 'OK';
  }

}
