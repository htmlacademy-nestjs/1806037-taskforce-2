import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from 'apps/user/src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtconfig: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtconfig.jwtSecret,
    });
  }

  async validate({ email, avatar, role }: Pick<UserDto, 'email' | 'role' | 'avatar'>) {
    return { email, avatar, role };
  }
}
