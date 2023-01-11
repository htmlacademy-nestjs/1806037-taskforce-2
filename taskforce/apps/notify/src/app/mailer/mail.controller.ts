import { Controller, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '@taskforce/core';

@Controller()
@UseFilters(AllExceptionsFilter)
export class MailController {}
