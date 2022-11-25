import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import dayjs = require("dayjs");

const ADULT_NUMBER = 18;

@ValidatorConstraint()
export class CustomDateValidator implements ValidatorConstraintInterface {
  validate(date: string) {
    const currentDate = dayjs();
    const targetDate = dayjs(date);

    if (currentDate.diff(targetDate, 'y') >= ADULT_NUMBER) return true;

    return false;
  }
}
