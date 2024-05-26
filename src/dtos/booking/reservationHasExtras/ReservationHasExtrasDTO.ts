import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class ExtrasDTO {
  @JoiSchema(Schema.id.required())
  id: number;

  @JoiSchema(Schema.quantity.required())
  quantity: number;
}
