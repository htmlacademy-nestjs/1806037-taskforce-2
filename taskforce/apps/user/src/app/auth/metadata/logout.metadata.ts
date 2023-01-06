import { SetMetadata } from "@nestjs/common";
import { MetadataEnum } from "apps/user/src/assets/enum/metadata.enum";

export const LogoutMeta = (...value: string[]) => SetMetadata(MetadataEnum.Logout, [value]);
