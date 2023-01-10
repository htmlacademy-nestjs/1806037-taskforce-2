import { Controller, Logger, LoggerService } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { CommandEventEnum } from '@taskforce/shared-types';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  private readonly logger: LoggerService = new Logger(EmailSubscriberController.name);

  constructor (
    private readonly emailSubscriberService: EmailSubscriberService,
  ) { }

  @ApiResponse({
    description: 'Add subscriber',
  })
  @EventPattern({
    cmd: CommandEventEnum.AddSubscriber,
  })
  public async createSubscriber(dto: CreateEmailSubscriberDto) {
    return await this.emailSubscriberService.addSubscriber(dto)
                    .catch(err => {throw err});
  }

  @ApiResponse({
    description: 'Notify subscribers about a new task',
  })
  @EventPattern({
    cmd: CommandEventEnum.AddTask,
  })
  public async notifyAboutTask(dto: any) {
    return await this.emailSubscriberService.notifyAboutTask(dto)
                    .catch(err => {throw err});
  }

}
