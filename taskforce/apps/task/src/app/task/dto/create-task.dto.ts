export class CreateTaskDto {
  title: string;

  description: string;

  category: string;

  price?: number;

  lifeTime?: Date;

  image?: string;

  address?: string;

  tags?: string[];
}
