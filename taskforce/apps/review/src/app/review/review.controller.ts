import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, ValidationError } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor (
    private readonly reviewService: ReviewService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create review',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateReviewDto): Promise<ReviewDto | ValidationError[]> {
    const newReview = plainToInstance(CreateReviewDto, dto, { excludeExtraneousValues: true, enableImplicitConversion: true });
    console.log(newReview);
    const errors = await validate(newReview);

    if (errors.length > 0) {
      return errors;
    }

    return fillDTO(ReviewDto, await this.reviewService.createReview(newReview));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete review by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id') commentId: string): Promise<string> {
    const result = await this.reviewService.deleteReview(commentId);

    if (result === null) {
      return `Comment with id: ${commentId} was not found`;
    }

    return 'OK';
  }

}
