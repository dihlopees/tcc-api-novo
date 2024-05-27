import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class UpdateExtrasDTO {
  @JoiSchema(Schema.id.optional())
  unitId: number;

  @JoiSchema(Schema.availableQuantity.optional())
  availableQuantity: number;

  @JoiSchema(Schema.username.optional())
  name: string;
}
