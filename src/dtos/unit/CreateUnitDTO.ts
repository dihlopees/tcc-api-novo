import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateUnitDTO {
  @JoiSchema(UserSchema.username.required())
  name: string;
}
