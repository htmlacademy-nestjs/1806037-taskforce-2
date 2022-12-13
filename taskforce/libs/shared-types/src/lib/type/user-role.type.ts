import { UserRoleEnum } from "../enum/user-role.enum";

export type UserRoleType = typeof UserRoleEnum[keyof typeof UserRoleEnum];
