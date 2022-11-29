import { UserRoleEnum } from "./user-role.enum";

export interface UserInterface {
  _id: string;
  email: string;
  passwordHash: string;
  role: keyof typeof UserRoleEnum;
  firstname: string;
  lastname: string;
  city: string;
  dateBirth: Date;
  avatar?: string;
}
