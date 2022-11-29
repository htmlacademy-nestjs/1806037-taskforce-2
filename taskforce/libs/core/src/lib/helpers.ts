import { genSaltSync } from "bcrypt";
import { ClassConstructor, plainToInstance } from "class-transformer";

const SALT_ROUNDS = 10;

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
};

export const SALT = genSaltSync(SALT_ROUNDS);
