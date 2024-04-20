import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class EditBlockDTO {
  @JoiSchema(Schema.username.optional())
  name: string;

  @JoiSchema(Schema.id.optional())
  unitId: number;
}
