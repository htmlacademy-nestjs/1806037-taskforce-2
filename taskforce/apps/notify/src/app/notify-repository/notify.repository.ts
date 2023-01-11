import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailSubscriberEntity } from "./entity/email-subscriber.entity";

@Injectable()
export class NotifyRepository {
  private readonly logger: LoggerService = new Logger(NotifyRepository.name)

  constructor (
    @InjectModel(EmailSubscriberEntity.name) private readonly emailSubscriberModel: Model<EmailSubscriberEntity>,
  ) { }

  public async create(item: EmailSubscriberEntity): Promise<EmailSubscriberEntity> {
    const newEmailSubscriberModel = new this.emailSubscriberModel(item);

    return await newEmailSubscriberModel.save();
  }

  public async delete(id: string): Promise<EmailSubscriberEntity> {
    return await this.emailSubscriberModel.findByIdAndDelete(id);
  }

  public async find(limit?: number, skip?: number): Promise<EmailSubscriberEntity[]> {
    return await this.emailSubscriberModel.find().limit(limit).skip(skip);
  }

  public async count(): Promise<number> {
    return await this.emailSubscriberModel.count();
  }

  public async findById(id: string): Promise<EmailSubscriberEntity> {
    return await this.emailSubscriberModel.findById(id);
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity> {
    return await this.emailSubscriberModel.findOne({
      email: email,
    });
  }
}
