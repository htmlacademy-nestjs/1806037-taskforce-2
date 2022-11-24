import { UserRole } from "@taskforce/shared-types";

export class CreateUserDto {
  public email: string;

  public password: string;

  public role: keyof typeof UserRole;

  public firstname: string;

  public lastname: string;

  public dateBirth: string;

  public city: string;

  public avatar?: string;
}
