import { Injectable } from '@nestjs/common';
import { comparePassword, fillDTO, getHashPassword } from '@taskforce/core';
import { UserRoleEnum } from '@taskforce/shared-types';
import { UpdateUserDtoType } from '../../assets/types/types';
import { UserMemoryRepository } from '../user-memory/user-memory.repository';
import { CustomerUserDto } from './dto/customer-user.dto';
import { PerformerUserDto } from './dto/performer-user.dro';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserMemoryRepository
  ) { }

  public async findUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      return `The user with this id: ${id} was not found`;
    }

    if (existUser.role === UserRoleEnum.Customer) {
      return fillDTO(CustomerUserDto, existUser);
    }
    if (existUser.role === UserRoleEnum.Performer) {
      return fillDTO(PerformerUserDto, existUser);
    }
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
