import * as crypto from 'crypto';
import dayjs = require('dayjs');

import { UserInterface } from '@taskforce/shared-types';
import { CRUDRepositoryInterface } from '@taskforce/core';

import { RegistrationUserEntityType } from '../../assets/types/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMemoryRepository implements CRUDRepositoryInterface<RegistrationUserEntityType, string, UserInterface> {
  private repository: {[key: string]: UserInterface} = {};

  public async create(item: RegistrationUserEntityType): Promise<UserInterface> {
    const entry = {  _id: crypto.randomUUID(), ...item.toObject(), createdAt: dayjs().toDate(), updatedAt: null };

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

  public async update(id: string, item: any): Promise<UserInterface> {
    this.repository[id] = { ...item.toObject(), updatedAt: dayjs().toDate() };

    return this.findById(id);
  }

  public async updatePassword(id: string, newPasswordHash: string) {
    this.repository[id] = { ...this.repository[id], passwordHash: newPasswordHash };

    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
