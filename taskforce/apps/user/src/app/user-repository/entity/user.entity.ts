import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoleEnum } from "@taskforce/shared-types";
import { UserRoleType } from "libs/shared-types/src/lib/type/user-role.type";
import { Document } from "mongoose";
import { CustomerUserEntity } from "./customer-user.entity";
import { PerformerUserEntity } from "./performer-user.entity";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserEntity extends Document { }

@Schema({
  collection: 'users',
  discriminatorKey: 'role',
  timestamps: true,
})
export class UserEntity {
  @Prop({
    type: String,
    required: true,
    enum: UserRoleEnum,
    // enum: [CustomerUserEntity.name, PerformerUserEntity.name],
  })
  public role: UserRoleType;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
