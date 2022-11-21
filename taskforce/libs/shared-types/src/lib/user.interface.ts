import { UserRole } from "./user-role.enum";

export interface UserInterface {
  _id: string;
  email: string;
  passwordHash: string;
  role: keyof typeof UserRole;
  firstname: string;
  lastname: string;
  city: string;
  dateBith: Date;
  avatar?: string;
}
