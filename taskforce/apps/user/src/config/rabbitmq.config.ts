import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { UserEnvEnterface } from "./user-env.interface";

export const getRabbitMqConfigForUserModule = (config: ConfigService<UserEnvEnterface>): RmqOptions => {
  const user = config.get<string>("RABBIT_USER");
  const password = config.get<string>("RABBIT_PASSWORD");
  const host = config.get<string>("RABBIT_HOST");
  const port = config.get<number>("RABBIT_PORT");
  const queue = config.get<string>("RABBIT_USERS_SERVICE_QUEUE");
  const url = `amqp://${user}:${[password]}@${host}:${port}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  };
};
