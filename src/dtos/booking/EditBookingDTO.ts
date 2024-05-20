import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';
import { ReservationHasExtrasDTO } from './reservationHasExtras/ReservationHasExtrasDTO';

JoiSchemaOptions({ allowUnknown: false });
export class EditBookingDTO {
  @JoiSchema(Schema.startTime.optional())
  startTime: string;

  @JoiSchema(Schema.endTime.optional())
  endTime: string;

  @JoiSchema(Schema.startDate.optional())
  startDate: string;

  @JoiSchema(Schema.endDate.optional())
  endDate: string;

  @JoiSchema(Schema.reservationColor.optional())
  reservationColor: string;

  @JoiSchema(Schema.note.optional())
  note: string;

  @JoiSchema(Schema.bookedForUserId.optional())
  bookedForUserId: number;

  @JoiSchema(Schema.id.optional())
  courseId: number;

  @JoiSchema(Schema.title.optional())
  title: string;

  @JoiSchema(Schema.id.optional())
  allocatableId: number;

  @JoiSchema(Schema.extras.optional())
  extras?: ReservationHasExtrasDTO[];
}
