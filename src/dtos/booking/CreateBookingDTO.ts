import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateBookingDTO {
  @JoiSchema(Schema.startTime.required())
  startTime: string;

  @JoiSchema(Schema.endTime.required())
  endTime: string;

  @JoiSchema(Schema.reservationColor.required())
  reservationColor: string;

  @JoiSchema(Schema.id.required())
  allocatableId: number;

  @JoiSchema(Schema.note.optional())
  note: string;

  @JoiSchema(Schema.bookedForUserId.optional())
  bookedForUserId: number;

  @JoiSchema(Schema.id.optional())
  courseId: number;
}
