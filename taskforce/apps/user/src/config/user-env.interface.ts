export interface UserEnvEnterface {
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
  RABBIT_USERS_SERVICE_QUEUE: string;
}
