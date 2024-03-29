import { HttpStatus, Logger } from '@nestjs/common'

export class ResponseDTO<T = unknown, U = unknown> {
  public statusCode: HttpStatus
  public message: string
  public data: T
  public rejectedInputs?: Array<U>

  constructor(statusCode: HttpStatus, message: string, data?: T, rejectedInputs?: Array<U>) {
    if (statusCode > HttpStatus.AMBIGUOUS) {
      Logger.error('Response must belong to a successful request')
      process.exit(1)
    }

    this.statusCode = statusCode
    this.message = message
    if (data) this.data = data
    if (rejectedInputs && rejectedInputs.length) this.rejectedInputs = rejectedInputs
  }
}
