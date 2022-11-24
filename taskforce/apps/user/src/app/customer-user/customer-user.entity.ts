import * as dayjs from 'dayjs';

import { UserInterface } from '@taskforce/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { CreateUserDto } from '../auth/dto/create-user.dto';

const SALT_ROUNDS = 10;

export class CustomerUserEntity implements UserInterface {
  public _id: string;

  public email: string;

  public passwordHash: string;

  public role: 'Customer' | 'Performer';

  public firstname: string;

  public lastname: string;

  public dateBirth: Date;

  public city: string;

  public avatar?: string;

  constructor(customerUser: CreateUserDto) {
    this.fillEntity(customerUser);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<CustomerUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = (await hash(password, salt));

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }

  public fillEntity(customerUser: CreateUserDto) {
    // this._id = String(id++);
    this.email = customerUser.email;
    // this.passwordHash = customerUser.passwordHash;
    this.role = customerUser.role;
    this.firstname = customerUser.firstname;
    this.lastname = customerUser.lastname;
    this.dateBirth = dayjs(customerUser.dateBirth).toDate();
    this.city = customerUser.city;
    this.avatar = customerUser?.avatar;
  }
}
