import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotifyRepositoryModule } from '../notify-repository/notify-repository.module';
import { getMailerConfig } from '../../config/get-mailer.config';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerConfig()),
    NotifyRepositoryModule,
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
