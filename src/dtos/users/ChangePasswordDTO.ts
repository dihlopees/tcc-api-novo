import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class UpdatePasswordUserDTO {
  @JoiSchema(Schema.password.required())
  password: string;

  @JoiSchema(Schema.password.required())
  oldPassword: string;
}
