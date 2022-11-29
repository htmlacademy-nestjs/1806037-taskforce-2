import { Injectable } from '@nestjs/common';
import { comparePassword, getHashPassword } from '@taskforce/core';
import { UserRoleEnum } from '@taskforce/shared-types';
import { RegistrationUserEntityType, UpdateUserDtoType } from '../../assets/types/types';
import { AuthUserDto } from '../auth/dto/auth-user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CustomerUserEntity } from '../user-memory/entities/customer-user.entity';
import { PerformerUserEntity } from '../user-memory/entities/performer-user.entity';
import { UserMemoryRepository } from '../user-memory/user-memory.repository';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserMemoryRepository
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

    const isCheckPassword = comparePassword(password, existUser.passwordHash);

    if (!isCheckPassword) {
      return `Invalid password`;
    }

    return existUser;
  }

  public async logout() {
    return 'NO_INPLEMENTS';
  }

  public async findUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      return `The user with this id: ${id} was not found`;
    }

    return existUser;
  }

  public async updateUserById(id: string, dto: UpdateUserDtoType) {
    const existUser =  await this.userRepository.findById(id);

    if (!existUser) {
      return `The user with this id: ${id} was not found`;
    }

    return await this.userRepository.update(id, dto);
  }

  public async updatePasswordUserById(id: string, dto: UpdatePasswordUserDto) {
    const {oldPassword, newPassword} = dto;
    const existUser =  await this.userRepository.findById(id);

    if (!existUser) {
      return `The user with this id: ${id} was not found`;
    }

    const isCheckPassword = comparePassword(oldPassword, existUser.passwordHash);

    if (!isCheckPassword) {
      return 'Invalid old password';
    }

    const newPasswordHash = getHashPassword(newPassword);

    return await this.userRepository.updatePassword(id, newPasswordHash);
  }

  public async deleteUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      return `The user with this id: ${id} was not found`;
    }

    return await this.userRepository.delete(id);
  }
}
