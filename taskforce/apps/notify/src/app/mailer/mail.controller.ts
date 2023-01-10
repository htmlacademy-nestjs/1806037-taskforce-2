import { Controller, HttpCode, HttpStatus, Logger, LoggerService, Post, Body, UseFilters } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { AllExceptionsFilter, handleError } from '@taskforce/core';
import { SendMessageDto } from '../../assets/dto/send-message.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEventEnum } from '@taskforce/shared-types';
import { CreateEmailSubscriberDto } from '../email-subscriber/dto/create-email-subscriber.dto';

@Controller('mail')
@UseFilters(AllExceptionsFilter)
export class MailController {
  private readonly logger: LoggerService = new Logger(MailController.name);

  constructor (
    private readonly mailService: MailService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sending messages',
  })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() dto: SendMessageDto) {
    const { recipient , sender, text } = dto;

    return await this.mailService.sendMessage(recipient, sender, text)
                  .catch(err => handleError(err));
  }
}
