import {  } from 'class-transformer';
import {  } from 'class-validator';

export class CreateTaskDto {
  @ApiRo
  title: string;

  description: string;

  category: string;

  price?: number;

  lifeTime?: Date;

  image?: string;

  address?: string;

  tags?: string[];
}
