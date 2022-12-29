import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AuthDataUserDto } from "../../auth/dto/auth-data-user.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthUserEntity extends Document { }

@Schema({
  collection: 'authUser',
})
export class AuthUserEntity {
  @Prop({
    required: true,
    unique: false,

  })
  public email: string;

  @Prop({
    default: null,
  })
  public refreshToken: string;

  public fillEntity(dto: AuthDataUserDto): this {
    const { email } = dto;

    this.email = email;

    return this;
  }
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUserEntity);
