import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  generateSuccessResponse(data: any, message: string, statusCode = 200) {
    return {
      status: 'success',
      data,
      message,
      statusCode
    };
  }

  generateErrorResponse(message: string, statusCode = 400) {
    return {
      status: 'error',
      data: null,
      message,
      statusCode,
    };
  }
}
