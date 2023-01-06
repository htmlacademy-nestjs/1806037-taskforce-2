import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger: LoggerService = new Logger(MailService.name);

  constructor (
    private readonly mailerService: MailerService,
  ) { }

  public async sendMessage(to: string, from?: string, text?: string) {
    const options = {
      to: to, // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: text ?? 'Hello world', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    };

    if (from) options['from'] = from;

    return await this.mailerService.sendMail(options);
  }
}
