import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRoleEnum } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMemoryRepository } from '../user-memory/user-memory.repository';
import { CustomerUserEntity } from '../user-memory/entities/customer-user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegistrationUserEntityType } from '../../assets/types/types';
import { PerformerUserEntity } from '../user-memory/entities/performer-user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository,
  ) { }

  public async register(dto: CreateUserDto) {
    const {email, password, role} = dto;

    const existUser = await this.userRepository
            .findByEmail(email);

    if (existUser) {
      return 'User already exists';
    }

    let registrationUserEntity: RegistrationUserEntityType;

    if (role === UserRoleEnum.Customer) {
      registrationUserEntity = await new CustomerUserEntity(dto)
      .setPassword(password);
    }
    if (role === UserRoleEnum.Performer) {
      registrationUserEntity = await new PerformerUserEntity(dto)
      .setPassword(password);
    }

    return await this.userRepository.create(registrationUserEntity);
  }

  public async verifyUser(user: AuthUserDto) {
    const {email, password} = user;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      return `The user with this email: ${email} was not found`;
    }

    const isCheckPassword = await compare(password, existUser.passwordHash);

    if (!isCheckPassword) {
      return `Invalid password`;
    }

    return existUser;
  }

  public async logout() {
    return 'NO_INPLEMENTS';
  }
}
