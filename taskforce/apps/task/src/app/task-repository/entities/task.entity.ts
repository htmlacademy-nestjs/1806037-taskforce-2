import { TaskCategoryInterface, TaskStatusEnum } from '@taskforce/shared-types';
import { CreateTaskDto } from '../../task/dto/create-task.dto';

export class TaskEntity {
  id: number;

  userId: string; // БУДЕТ ЗАМЕНЕНО НА ССЫЛКУ НА СУЩНОСТЬ СОЗДАТЕЛЯ ИЗ БД

  title: string;

  status: keyof typeof TaskStatusEnum;

  description: string;

  category: TaskCategoryInterface[]; // Тут типизация для ID

  price?: number;

  lifeTime?: Date;

  image?: string;

  address?: string;

  tags?: string[];

  repliedPerformers: string[]; // БУДЕТ ЗАМЕНЕНО НА МАССИВ ИЗ ССЫЛОК НА СУЩНОСТИ ИСПОЛНИТЕЛЕЙ ИЗ БД

  currentPerformer: string; // БУДЕТ ЗАМЕНЕНО НА ССЫЛКУ НА СУЩНОСТЬ ИСПОЛНИТЕЛЯ ИЗ БД

  createdAt: Date;

  updatedAt: Date;

  constructor (dto: CreateTaskDto, category: TaskCategoryInterface) {
    this.fillEntity(dto, category);
  }

  private async fillEntity(dto: CreateTaskDto, category: TaskCategoryInterface) {
    const { userId, title, description, price, lifeTime, image, address, tags } = dto;

    this.userId = userId;
    this.title = title;
    this.description = description;
    this.category = [category];
    this.price = price;
    this.lifeTime= lifeTime;
    this.image = image;
    this.address = address;
    this.tags = tags;

    this.status = TaskStatusEnum.New;
  }

  public toObject() {
    return {
      ...this,
      category: this.category.map(item => ({id: item.id})),
     };
  }

}
