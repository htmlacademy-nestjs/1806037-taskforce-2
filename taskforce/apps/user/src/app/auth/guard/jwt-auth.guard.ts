/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, LoggerService, UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger: LoggerService = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    if (context.getHandler().name === 'logout') {
      const accessToken = context.switchToHttp().getRequest().headers['authorization'].split(' ')[1];

      try {
        await this.jwtService.verifyAsync(accessToken, {
          ignoreExpiration: true,
        });

        return true;
      } catch (err) {
        return this.handleRequest(err, undefined, undefined, context);
      }
    }
    if (context.getHandler().name === 'refreshToken') {
      return true;
    }

    return await super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err) {
      const error = err as Error ?? undefined;
      this.logger.error(error.message, error.stack);

      throw new UnauthorizedException(`${error.message}.`);
    }
    if (info) {
      const error = info as Error ?? undefined;
      this.logger.error(error.message, error.stack);

      throw new UnauthorizedException(`${error.message}.`);
    }

    return user;
  }
}
