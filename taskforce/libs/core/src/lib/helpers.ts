import { ClassConstructor, plainToInstance } from "class-transformer";

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
};
