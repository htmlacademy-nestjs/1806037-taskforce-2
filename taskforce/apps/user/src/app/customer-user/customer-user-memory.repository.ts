import { CRUDRepositoryInterface } from '@taskforce/core';
import { UserInterface } from '@taskforce/shared-types';
import { CustomerUserEntity } from './customer-user.entity';
import * as crypto from 'crypto';

export class CustomerUserMemoryRepository implements CRUDRepositoryInterface<CustomerUserEntity, string, UserInterface> {
  private repository: {[key: string]: UserInterface} = {};

  public async create(item: CustomerUserEntity): Promise<UserInterface> {
    const entry = {  _id: crypto.randomUUID(), ...item.toObject() };

    this.repository[entry._id] = entry;

    return {...this.repository[entry._id]};
  }

  public async findById(id: string): Promise<UserInterface> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    const existUser = Object.values(this.repository)
      .find((user) => user.email === email);

    if (!existUser) {
      return null;
    }

    return existUser;
  }

  public async update(id: string, item: CustomerUserEntity): Promise<UserInterface> {
    this.repository[id] = { ...item.toObject() };

    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
