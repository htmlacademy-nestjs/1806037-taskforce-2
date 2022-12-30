import { ConfigType, registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { EnvNameEnum } from "@taskforce/shared-types";

export const jwtConfig = registerAs(EnvNameEnum.JwtConfig, () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

export const getJwtConfig = async(config: ConfigType<typeof jwtConfig> = jwtConfig()): Promise<JwtModuleOptions> => {
  return {
    secret: config.jwtSecret,
    signOptions: {
      algorithm: "HS256",
      expiresIn: '60s',
    },
  };
}
