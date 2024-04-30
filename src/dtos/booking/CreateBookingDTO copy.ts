import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class EditBookingDTO {
  @JoiSchema(Schema.startTime.optional())
  startTime: string;

  @JoiSchema(Schema.endTime.optional())
  endTime: string;

  @JoiSchema(Schema.reservationColor.optional())
  reservationColor: string;

  @JoiSchema(Schema.note.optional())
  note: string;

  @JoiSchema(Schema.bookedForUserId.optional())
  bookedForUserId: number;

  @JoiSchema(Schema.id.optional())
  courseId: number;
}
