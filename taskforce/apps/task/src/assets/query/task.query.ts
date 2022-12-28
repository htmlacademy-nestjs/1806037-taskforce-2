import { Transform } from "class-transformer";
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { DEFAULT_PAGINATION_COUNT, DEFAULT_SORT_VALUE, DEFAULT_TASKS_LIMIT } from "../constant/constants";


export class TaskQuery {
  @Transform(({ value }) => {
    const numValue = +value;
    if (numValue < 1) return DEFAULT_TASKS_LIMIT;

    return numValue;
  })
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASKS_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGINATION_COUNT)
  @IsNumber()
  @IsOptional()
  public page = DEFAULT_PAGINATION_COUNT;

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  public categories?: string[];

  @Transform(({ value }) => value ? value.split(',') : undefined)
  @IsArray()
  @IsString({
    each: true
  })
  @IsOptional()
  public tags?: string[];

  @IsString()
  @IsOptional()
  public city?: string;

  @IsIn(['desc', 'popular'])
  @IsOptional()
  public sort: 'desc' | 'popular' = DEFAULT_SORT_VALUE;
}
