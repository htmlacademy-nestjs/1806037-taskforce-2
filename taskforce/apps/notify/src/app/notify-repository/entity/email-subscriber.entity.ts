import { NotifySubscriberInterface } from "@taskforce/shared-types";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateEmailSubscriberDto } from "../../email-subscriber/dto/create-email-subscriber.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmailSubscriberEntity extends Document { }

@Schema({
  collection: 'email_subscriber',
  timestamps: true,
})
export class EmailSubscriberEntity implements EmailSubscriberEntity, NotifySubscriberInterface {
  @Prop()
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  role: string;

  public fillEntity(dto: CreateEmailSubscriberDto) {
    const { email, firstname, role } = dto;

    this.email = email;
    this.firstname = firstname;
    this.role = role;

    return this;
  }
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberEntity);
