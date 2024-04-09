import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { AuthenticationSchema } from '../../schemas/AuthenticationSchema';

JoiSchemaOptions({ allowUnknown: false });
export class LoggedUserDTO {
  @JoiSchema(AuthenticationSchema.email.required())
  email: string;

  @JoiSchema(AuthenticationSchema.password.required())
  password: string;
}
