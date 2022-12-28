import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthUserEntity } from "../user-repository/entity/auth-user.entity";
import { UserRepository } from "../user-repository/user.repository";

@Injectable()
export class AuthTokenVerificationService {
  private readonly logger: LoggerService = new Logger(AuthTokenVerificationService.name);
  private readonly intervalTime = 1000 * 30; // TODO 30 секунд между проверками

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    setInterval(this.checkAuthUsersForLifetime.bind(this), this.intervalTime);
  }

  private async checkAuthUsersForLifetime(): Promise<void> {
    const authUsers = await this.userRepository.getAllAuthUser() as unknown as AuthUserEntity[];
    for (const item of authUsers) {
      try {
        await this.jwtService.verifyAsync(item.refreshToken, {
          ignoreExpiration: false,
        });
      } catch (err) {
        await this.userRepository.removeAuthUser(item.email);
      }
    }
  }
}
