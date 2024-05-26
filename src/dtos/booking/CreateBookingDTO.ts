import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';
import { ExtrasDTO } from './reservationHasExtras/ReservationHasExtrasDTO';

JoiSchemaOptions({ allowUnknown: false });
export class CreateBookingDTO {
  @JoiSchema(Schema.startTime.required())
  startTime: string;

  @JoiSchema(Schema.endTime.required())
  endTime: string;

  @JoiSchema(Schema.startDate.required())
  startDate: string;

  @JoiSchema(Schema.endDate.optional())
  endDate: string;

  @JoiSchema(Schema.title.required())
  title: string;

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

  @JoiSchema(Schema.extras.optional())
  extras?: ExtrasDTO[];
}
