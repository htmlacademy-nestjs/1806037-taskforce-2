import { SetMetadata } from "@nestjs/common";

export const RefreshToken = (...value: string[]) => SetMetadata('refreshToken', [value]);
