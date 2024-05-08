import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class ReservationHasExtrasDTO {
  @JoiSchema(Schema.id.required())
  id: number;

  @JoiSchema(Schema.quantity.required())
  quantity: number;
}
