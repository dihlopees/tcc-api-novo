import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateCourseDTO {
  @JoiSchema(UserSchema.username.required())
  name: string;
}
