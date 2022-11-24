import { Injectable } from '@nestjs/common';
// import { fillDTO } from '@taskforce/core';
import { UserInterface } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomerUserMemoryRepository } from '../customer-user/customer-user-memory.repository';
import { CustomerUserEntity } from '../customer-user/customer-user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly customerUserRepository: CustomerUserMemoryRepository,
  ) { }

  public async register(dto: CreateUserDto) {
    const {email, password} = dto;

    const existUser = await this.customerUserRepository
            .findByEmail(email);

    if (existUser) {
      throw new Error('User already exists');
    }

    const customerUserEntity = await new CustomerUserEntity(dto)
            .setPassword(password);

    return await this.customerUserRepository.create(customerUserEntity);
  }

  public async verifyUser() {

  }
}
