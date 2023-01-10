/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/get-rabbitmq.config';
import { NotifyEnvInterface } from './config/notify-env.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
                   .setTitle('The «Notify» service')
                   .setDescription('«Notify» service API')
                   .setVersion('1.0')
                   .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('specification', app, document);


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const configService = app.get<ConfigService<NotifyEnvInterface>>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
