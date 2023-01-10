import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { validateTaskModuleEnvironments } from '../../assets/validate/task-env.validate';
import { getRabbitMqConfig } from '../../config/get-rabbitmq.config';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { TaskRepositoryModule } from '../task-repository/task-repository.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: './apps/task/src/environments/.tasks.env',
      validate: validateTaskModuleEnvironments,
    }),
    TaskRepositoryModule,
    TaskCategoryModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        inject: [ConfigService],
        useFactory: getRabbitMqConfig,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
