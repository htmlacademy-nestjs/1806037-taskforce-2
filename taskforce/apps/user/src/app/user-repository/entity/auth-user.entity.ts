import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AuthDataUserDto } from "../../auth/dto/auth-data-user.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthUserEntity extends Document { }

@Schema({
  collection: 'authUser',
  // timestamps: true,
})
export class AuthUserEntity {
  @Prop({
    required: true,
    unique: true
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public refreshToken: string;

  public fillEntity(dto: AuthDataUserDto): this {
    const { userId, email, refreshToken } = dto;

    this.userId = userId;
    this.email = email;
    this.refreshToken = refreshToken;

    return this;
  }
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUserEntity);
