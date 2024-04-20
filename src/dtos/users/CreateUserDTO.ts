import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateUserDTO {
  @JoiSchema(Schema.username.required())
  name: string;

  @JoiSchema(Schema.email.required())
  email: string;

  @JoiSchema(Schema.role.required())
  role: string;

  @JoiSchema(Schema.password.required())
  password: string;
}
