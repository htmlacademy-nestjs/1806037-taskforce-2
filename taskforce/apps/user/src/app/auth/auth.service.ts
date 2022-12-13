import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { comparePassword } from '@taskforce/core';
import { UserEntityType } from '../../assets/type/types';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../user-repository/user.repository';

@Injectable()
export class AuthService {
  private readonly logger: LoggerService = new Logger(AuthService.name);
  constructor (
    private readonly userRepository: UserRepository,
  ) { }

  public async register(dto: CreateUserDto): Promise<UserEntityType | Error> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new Error('User already exists');
    }

    return await this.userRepository.create(dto);
  }


  public async verifyUser(dto: AuthUserDto) {
    const {email, password} = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(`The user with this email: ${email} was not found`);
    }

    const isCheckPassword = comparePassword(password, existUser.passwordHash);

    if (!isCheckPassword) {
      throw new Error(`Invalid password`);
    }

    return existUser;
  }

  public async logout() {
    return 'NO_INPLEMENTS';
  }

}
