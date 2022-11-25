import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import dayjs = require("dayjs");


@ValidatorConstraint()
export class CurrentDateValidator implements ValidatorConstraintInterface {
  validate(date: string) {
    const currentDate = dayjs();
    const targetDate = dayjs(date);

    if (currentDate.diff(targetDate) > 0) return true;

    return false;
  }
}
