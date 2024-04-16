import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateUserDTO {
  @JoiSchema(UserSchema.username.required())
  name: string;

  @JoiSchema(UserSchema.email.required())
  email: string;

  @JoiSchema(UserSchema.role.required())
  role: string;

  @JoiSchema(UserSchema.password.required())
  password: string;
}
