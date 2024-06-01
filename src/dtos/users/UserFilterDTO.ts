import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class UserFilterDTO {
  @JoiSchema(Schema.username.optional())
  name: string;

  @JoiSchema(Schema.email.optional())
  email: string;

  @JoiSchema(Schema.role.optional())
  role: string;
}
