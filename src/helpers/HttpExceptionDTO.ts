import { HttpException, HttpStatus } from '@nestjs/common';

export type ExceptionType = 'WARN' | 'ERROR';
export class HttpExceptionDTO<T = unknown> extends HttpException {
  developerMessage: string;
  userMessage: string;
  type: ExceptionType;
  errorCode: number;
  rejectedInputs?: Array<T>;

  constructor({
    developerMessage,
    userMessage,
    type,
    rejectedInputs,
    errorCode,
  }: {
    developerMessage: string;
    userMessage: string;
    type: ExceptionType;
    errorCode: number;
    rejectedInputs?: Array<T>;
  }) {
    super(
      { developerMessage, userMessage },
      errorCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.userMessage = userMessage;
    this.developerMessage = developerMessage;
    this.type = type;
    this.errorCode = errorCode;
    if (rejectedInputs && rejectedInputs.length)
      this.rejectedInputs = rejectedInputs;
  }

  static error<T>(
    developerMessage: string,
    userMessage: string,
    errorCode: number,
    rejectedInputs?: Array<T>,
  ): HttpExceptionDTO<T> {
    return new HttpExceptionDTO({
      developerMessage,
      errorCode,
      type: 'ERROR',
      userMessage,
      rejectedInputs,
    });
  }

  static warn<T>(
    developerMessage: string,
    userMessage: string,
    errorCode: number,
    rejectedInputs?: Array<T>,
  ): HttpExceptionDTO<T> {
    return new HttpExceptionDTO({
      developerMessage,
      errorCode,
      type: 'WARN',
      userMessage,
      rejectedInputs,
    });
  }
}
