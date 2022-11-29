import { ValidatorConstraintInterface } from "class-validator";

const MIN_VALUE = 1;
const MAX_VALUE = 5;

export class CustomNumberValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    const number = Number(value);

    console.log(number);

    if (Number.isNaN(number)) return false;
    if (!Number.isInteger(number)) return false;
    if (number < MIN_VALUE && number > MAX_VALUE) return false;

    return true;
  }

}
