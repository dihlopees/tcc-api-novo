import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateExtrasDTO {
  @JoiSchema(UserSchema.username.required())
  name: string;
  unit: string;
  availableQuantity: number;
}
