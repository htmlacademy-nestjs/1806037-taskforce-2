import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { NotifyRepositoryModule } from '../notify-repository/notify-repository.module';
import { MailModule } from '../mailer/mail.module';

@Module({
  imports: [
    NotifyRepositoryModule,
    MailModule,
  ],
  providers: [EmailSubscriberService],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
