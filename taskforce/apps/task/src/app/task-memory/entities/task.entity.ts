import { TaskInterface, TaskStatusEnum } from '@taskforce/shared-types';
import { CreateTaskDto } from '../../task/dto/create-task.dto';

export class TaskEntity implements TaskInterface {
  _id: string;

  author: string; // БУДЕТ ЗАМЕНЕНО НА ССЫЛКУ НА СУЩНОСТЬ СОЗДАТЕЛЯ ИЗ БД

  title: string;

  status: keyof typeof TaskStatusEnum;

  description: string;

  category: string;

  price?: number;

  lifeTime?: Date;

  image?: string;

  address?: string;

  tags?: string[];

  repliedPerformers: object[]; // БУДЕТ ЗАМЕНЕНО НА МАССИВ ИЗ ССЫЛОК НА СУЩНОСТИ ИСПОЛНИТЕЛЕЙ ИЗ БД

  currentPerformer: string; // БУДЕТ ЗАМЕНЕНО НА ССЫЛКУ НА СУЩНОСТЬ ИСПОЛНИТЕЛЯ ИЗ БД

  createdAt: Date;

  updatedAt: Date[];

  constructor (dto: CreateTaskDto) {
    this.fillEntity(dto);
  }

  private async fillEntity(dto: CreateTaskDto) {
    const { author, title, description, category, price, lifeTime, image, address, tags } = dto;

    this.author = author;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.lifeTime= lifeTime;
    this.image = image;
    this.address = address;
    this.tags = tags;

    this.repliedPerformers = [];
    this.currentPerformer = '';

    this.status = TaskStatusEnum.New;

    this.updatedAt = [];
  }

  public toObject() {
    return { ...this };
  }

}
