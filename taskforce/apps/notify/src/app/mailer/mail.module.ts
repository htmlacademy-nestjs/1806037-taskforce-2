import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { NotifyRepositoryModule } from '../notify-repository/notify-repository.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtp://localhost:5025',
        defaults: {
          from: 'Vasya Svetov <v@vsvetov.me>'
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    NotifyRepositoryModule,
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}