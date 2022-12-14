import { SetMetadata } from "@nestjs/common";
import { MetadataEnum } from "apps/user/src/assets/enum/metadata.enum";

export const RefreshTokenMeta = (...value: string[]) => SetMetadata(MetadataEnum.RefreshToken, [value]);
