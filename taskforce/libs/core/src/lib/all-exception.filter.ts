import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger, LoggerService } from "@nestjs/common";
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from "class-validator";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: LoggerService = new Logger(AllExceptionsFilter.name);

  constructor(@Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    const { httpAdapter } = this.httpAdapterHost;

    const error = (() => {
      switch (true) {
        case exception instanceof HttpException: {
          exception.response['stack'] = exception.stack;
          return exception;
        }
        case exception instanceof Error: {
          return {
            response: {
              message: exception.message,
              error: HttpStatus.INTERNAL_SERVER_ERROR,
              stack: exception.stack,
            },
          }
        }
        default: return exception;
      }
    })();

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: error.response.message,
      error: error.response.error,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.logger.error(error.response.message, error.response.stack);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
