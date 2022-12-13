import { UserRoleType } from "../type/user-role.type";

export interface UserInterface {
  email: string;
  passwordHash: string;
  role: UserRoleType;
  firstname: string;
  lastname: string;
  city: string;
  dateBirth: Date;
  avatar?: string;
}
