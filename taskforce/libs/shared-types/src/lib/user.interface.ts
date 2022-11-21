import { UserRole } from "./user-role.enum";

export interface UserInterface {
  _id: string;
  email: string;
  passwordHash: string;
  firstname: string;
  lastname: string;
  city: string;
  role: keyof typeof UserRole;
  avatar?: string;
  dateBith: Date;
}
