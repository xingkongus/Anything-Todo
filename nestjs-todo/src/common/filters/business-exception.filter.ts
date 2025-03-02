import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exceptions/business.exception';

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('exceptionResponse', exceptionResponse)

    // 处理业务异常
    response.status(HttpStatus.OK).send({
      data: null,
      code: exceptionResponse['code'],
      message: exceptionResponse['message'],
      success: false,
      timestamp: new Date().toISOString(),
    });
    return;
  }
}