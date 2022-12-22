import { CreateTaskCategoryDto } from "../../task-category/dto/create-task-category.dto";
import { UpdateTaskCategoryDto } from "../../task-category/dto/update-task-category.dto";

export class TaskCategoryEntity {
  public id: number;
  public title: string;

  constructor(dto: CreateTaskCategoryDto | UpdateTaskCategoryDto) {
    this.fillEntity(dto);
  }

  public fillEntity(dto: CreateTaskCategoryDto) {
    const { title } = dto;

    this.title = title;
  }

  public toObject() {
    return { ...this };
  }
}
