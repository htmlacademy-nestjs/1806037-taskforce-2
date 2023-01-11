import * as path from 'path';
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService } from "@nestjs/config";
import { NotifyEnvInterface } from "./notify-env.interface";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export function getMailerConfig(): MailerAsyncOptions {
  return {
    inject: [ConfigService],
    useFactory: async (config: ConfigService<NotifyEnvInterface>) => ({
      transport: {
        host: config.get<string>("MAIL_SMTP_HOST"),
        port: config.get<number>("MAIL_SMTP_PORT"),
        secure: false,
        auth: {
          user: config.get<string>("MAIL_USERNAME"),
          pass: config.get<string>("MAIL_PASSWORD")
        }
      },
      defaults: {
        from: config.get<string>("MAIL_FROM"),
      },
      template: {
        dir: path.resolve(__dirname, 'assets', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
  }
}
