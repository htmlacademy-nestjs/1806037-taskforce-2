import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserInterface } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMemoryRepository } from '../customer-user/customer-user-memory.repository';
import { CustomerUserEntity } from '../customer-user/customer-user.entity';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository,
  ) { }

  public async register(dto: CreateUserDto) {
    const {email, password} = dto;

    const existUser = await this.userRepository
            .findByEmail(email);

    if (existUser) {
      throw new Error('User already exists');
    }

    const customerUserEntity = await new CustomerUserEntity(dto)
            .setPassword(password);

    return await this.userRepository.create(customerUserEntity);
  }

  public async verifyUser(user: LoginUserDto) {
    const {email, password} = user;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      return `The user with this email: ${email} was not found`;
    }

    const isCheckPassword = await compare(password, existUser.passwordHash);

    if (!isCheckPassword) {
      return `Invalid password`;
    }
  }
}
