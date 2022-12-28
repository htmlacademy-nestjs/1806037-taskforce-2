import { ConflictException, HttpException, HttpStatus, Injectable, Logger, LoggerService, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from '@taskforce/core';
import { UserEntityType } from '../../assets/type/types';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../user-repository/user.repository';
import { JwtService } from '@nestjs/jwt/dist';
import { UserDto } from './dto/user.dto';
import { AuthDataUserDto } from './dto/auth-data-user.dto';
import { JwtRefreshTokenDto } from './dto/jwt-refresh-token.dto';
import { JwtPayloadType } from '../../assets/type/jwt-payload.type';

@Injectable()
export class AuthService {
  private readonly logger: LoggerService = new Logger(AuthService.name);

  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async register(dto: CreateUserDto): Promise<UserEntityType | Error> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    return await this.userRepository.create(dto);
  }


  public async verifyUser(email: string): Promise<UserEntityType> {

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(`The user with this email: ${email} was not found`);
    }

    return existUser;
  }

  public async verifyPassword(password: string, passwordHash: string) {
    const isCheckPassword = comparePassword(password, passwordHash);

    if (!isCheckPassword) {
      throw new UnauthorizedException(`Invalid password`);
    }
  }

  public async login(dto: AuthUserDto) {
    const {email, password} = dto;

    const existUser = await this.verifyUser(email);

    await this.verifyPassword(password, existUser.passwordHash);

    if (await this.userRepository.getAuthUserByEmail(email)) {
      throw new ConflictException(`User with this email: "${existUser.email}" has already been authenticated.`);
    }

    const payload: JwtPayloadType = {
      sub: existUser._id,
      email: existUser.email,
      role: existUser.role,
      firstname: existUser.firstname,
      lastname: existUser.lastname,
    };

    const tokens = {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
        expiresIn: '3h',
      })
    };

    // TODO
    // Добавляем данного пользователя в БД для авторизованных
    const authDataUser: AuthDataUserDto = {
      userId: existUser._id,
      email: existUser.email,
      refreshToken: tokens.refresh_token,
    };

    try {
      await this.userRepository.addAuthUser(authDataUser);
    } catch (err) {
      const error = err as Error;
      this.logger.error(error.message, error.stack);

      throw new ConflictException(`User with this email: "${existUser.email}" has already been authenticated.`)
    }
    //

    return tokens;
  }

  public async refreshToken(dto: JwtRefreshTokenDto) {
    const { refresh_token } = dto;

    let jwtPayload: JwtPayloadType;

    try {
      jwtPayload = await this.jwtService.verifyAsync(refresh_token);
    } catch {
      throw new ConflictException(`This refresh token is invalid.`);
    }

    const existAuthUser = await this.userRepository.getAuthUserByEmail(jwtPayload.email) as unknown as AuthDataUserDto;

    if (existAuthUser.refreshToken !== refresh_token) {
      throw new ConflictException(`This refresh token is invalid.`);
    }

    const payload: JwtPayloadType = {
      sub: jwtPayload.sub,
      email: jwtPayload.email,
      role: jwtPayload.role,
      firstname: jwtPayload.firstname,
      lastname: jwtPayload.lastname,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async logout(token: string) {
    const jwtPayload: JwtPayloadType = await this.jwtService.verifyAsync(token, {
      ignoreExpiration: true,
    });

    return await this.userRepository.removeAuthUser(jwtPayload.email);
  }

  public async getUserById(id: string): Promise<UserDto> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(`The user with this id: ${id} was not found`);
    }

    return existUser as UserDto;
  }

}
