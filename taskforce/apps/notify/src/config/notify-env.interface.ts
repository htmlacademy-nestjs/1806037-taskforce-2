export interface NotifyEnvInterface {
  MONGO_DB: string;
  MONGO_HOST: string;
  MONGO_PORT: number;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_AUTH_BASE: string;

  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_HOST: string;
  RABBIT_PORT: number;
  RABBIT_NOTIFY_SERVICE_QUEUE: string;

  MAIL_SMTP_HOST: string;
  MAIL_SMTP_PORT: number;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  MAIL_FROM: string;
}
