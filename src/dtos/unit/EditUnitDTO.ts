import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class EditUnitDTO {
  @JoiSchema(Schema.username.optional())
  name: string;
}
