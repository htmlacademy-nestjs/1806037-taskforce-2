import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { CustomError } from '@taskforce/core';
import { ExceptionEnum } from '@taskforce/shared-types';
import { MailService } from '../mailer/mail.service';
import { EmailSubscriberEntity } from '../notify-repository/entity/email-subscriber.entity';
import { NotifyRepository } from '../notify-repository/notify.repository';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  private readonly logger: LoggerService = new Logger(EmailSubscriberService.name);

  constructor (
    private readonly notifyRepository: NotifyRepository,
    private readonly mailService: MailService,
  ) { }

  public async addSubscriber(dto: CreateEmailSubscriberDto): Promise<EmailSubscriberEntity> {
    const { email } = dto;
    const existSubscriber = await this.notifyRepository.findByEmail(email);

    if (existSubscriber) { throw new CustomError('The subscriber with same email already exists', ExceptionEnum.Conflict) }

    return await this.notifyRepository.create(new EmailSubscriberEntity().fillEntity(dto));
  }

  public async notifyAboutTask(dto: any) {
    const subscribersList = await this.notifyRepository.find();

    for (const item of subscribersList) {
      const { email } = item;
      const { title } = dto;
      const text = `There is a new task "${title}" for performers`;

      await this.mailService.sendMessage(email, null, text);
    }
  }
}
