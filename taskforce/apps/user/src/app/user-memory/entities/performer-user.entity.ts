import * as dayjs from 'dayjs';
import { compare, hash } from "bcrypt";

import { UserInterface, UserRoleEnum } from "@taskforce/shared-types";

// import { SALT_ROUNDS } from "../../../assets/constants";
import { CreateUserDto } from "../../auth/dto/create-user.dto";
import { comparePassword, getHashPassword, SALT } from '@taskforce/core';

export class PerformerUserEntity implements UserInterface {
  public _id: string;

  public email: string;

  public passwordHash: string;

  public role: keyof typeof UserRoleEnum;

  public firstname: string;

  public lastname: string;

  public dateBirth: Date;

  public city: string;

  public avatar?: string;

  public description: string;

  public specialization: string[];

  public rating: number;

  public tasks: object[];

  public createdAt: Date;

  public updatedAt: Date | null;



  constructor(performerUser: CreateUserDto) {
    this.fillEntity(performerUser);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<PerformerUserEntity> {
    // const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = getHashPassword(password);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return comparePassword(password, this.passwordHash);
  }

  public fillEntity(customerUser: CreateUserDto) {
    this.email = customerUser.email;
    this.role = customerUser.role;
    this.firstname = customerUser.firstname;
    this.lastname = customerUser.lastname;
    this.dateBirth = dayjs(customerUser.dateBirth).toDate();
    this.city = customerUser.city;
    this.avatar = customerUser?.avatar;
    this.description = '';
    this.specialization = [];
    this.tasks = [];
    // this.createdAt = dayjs().toDate();
    // this.updatedAt = null;
  }
}
