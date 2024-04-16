import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../../schemas/UserSchema';

JoiSchemaOptions({ allowUnknown: false });
export class EditCourseDTO {
  @JoiSchema(UserSchema.username.optional())
  name: string;
}
