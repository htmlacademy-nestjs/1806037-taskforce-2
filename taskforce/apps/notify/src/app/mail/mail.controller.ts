import { Controller, HttpCode, HttpStatus, Logger, LoggerService, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { CustomError, handleError } from '@taskforce/core';
import { SendMessageDto } from '../../assets/dto/send-message.dto';

@Controller('mail')
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
    try {
      return await this.mailService.sendMessage(recipient, sender, text);
    } catch (err) {
      const error = err as CustomError;
      this.logger.error(error.message, error.stack);
      handleError(error);
    }
  }
}
