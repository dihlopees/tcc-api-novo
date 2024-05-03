import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class BookingFilterDTO {
  @JoiSchema(Schema.startTime.optional())
  startTime: string;

  @JoiSchema(Schema.endTime.optional())
  endTime: string;
}
