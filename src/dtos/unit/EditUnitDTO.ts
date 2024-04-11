import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class EditUnitDTO {
  @JoiSchema(UserSchema.username.optional())
  name: string;

  @JoiSchema(UserSchema.id.required())
  id: number;
}
