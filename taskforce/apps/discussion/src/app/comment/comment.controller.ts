import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseFilters } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AllExceptionsFilter, CustomError, fillDTO, handleError } from '@taskforce/core';
import { ExceptionEnum } from '@taskforce/shared-types';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AllExceptionsFilter)
export class CommentController {
  constructor (
    private readonly commentService: CommentService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Creating a comment',
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    return fillDTO(CommentDto, await this.commentService.create(dto));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments',
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getComments(@Query() query: CommentQuery): Promise<CommentDto | CommentDto[]> {
    return fillDTO(CommentDto, await this.commentService.getComments(query));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comment by id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getComment(@Param('id') commentId: string): Promise<CommentDto | string> {
    return fillDTO(CommentDto,
      await this.commentService.getComment(commentId)
                .then((result) => {
                  if (!result) throw new CustomError(`Comment with this id: ${commentId} is not found.`, ExceptionEnum.NotFound);
                  return result;
                })
                .catch((error) => handleError(error))
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete comment by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteComment(@Param('id') commentId: string): Promise<string> {
    await this.commentService.delete(commentId)
      .then((result) => { if (!result) throw new CustomError(`Comment with this id: ${commentId} is not found.`, ExceptionEnum.NotFound) })
      .catch((error) => handleError(error));

    return 'OK';
  }

}
