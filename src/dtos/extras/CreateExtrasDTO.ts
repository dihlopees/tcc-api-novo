import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateExtrasDTO {
  @JoiSchema(Schema.username.required())
  name: string;

  @JoiSchema(Schema.id.required())
  unitId: number;

  @JoiSchema(Schema.availableQuantity.required())
  availableQuantity: number;
}
