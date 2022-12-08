import { Injectable } from '@nestjs/common';
import { comparePassword, getHashPassword } from '@taskforce/core';
import { UpdateUserDtoType, UserEntityType } from '../../assets/type/types';
import { UserRepository } from '../user-repository/user.repository';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) { }


  public async findUserById(id: string): Promise<UserEntityType> {
    const existUser =  await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`The user with this id: ${id} was not found`);
    }

    return existUser;
  }

  public async updateUserById(id: string, dto: UpdateUserDtoType): Promise<UserEntityType> {
    const existUser =  await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`The user with this id: ${id} was not found`);
    }

    return await this.userRepository.update(id, dto);
  }

  public async updatePassword(id: string, dto: UpdatePasswordUserDto): Promise<UserEntityType> {
    const {oldPassword, newPassword} = dto;
    const existUser =  await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`The user with this id: ${id} was not found`);
    }

    const isCheckPassword = comparePassword(oldPassword, existUser.passwordHash);

    if (!isCheckPassword) {
      throw new Error('Invalid old password');
    }

    const newPasswordHash = getHashPassword(newPassword);

    return await this.userRepository.updatePassword(id, newPasswordHash);
  }

  public async deleteUserById(id: string): Promise<void> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`The user with this id: ${id} was not found`);
    }

    return await this.userRepository.delete(id);
  }
}
