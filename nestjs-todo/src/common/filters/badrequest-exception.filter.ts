import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';
import { BUSINESS_ERROR_CODE } from '../exceptions';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const originStatus = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (exception instanceof BadRequestException) {
      let message = '';
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const _originResp = exceptionResponse as Record<string, any>;
        if (typeof _originResp.message === 'string') {
          message = _originResp.message;
        } else if (isArray(_originResp.message)) {
          message = _originResp.message.join('，');
        }
      }

      response.status(HttpStatus.OK).json({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: message,
        data: null,
        success: false,
      });
      return;
    }

    if (typeof exceptionResponse === 'string') {
      response.status(originStatus).send({
        code: originStatus,
        message: exceptionResponse,
        data: null,
        success: false,
      });
    } else {
      // todo show error while during the development mode
      response.status(originStatus).send({
        code: originStatus,
        data: null,
        success: false,
        error: exceptionResponse,
      });
    }
    return;
  }
}