import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class EditCourseDTO {
  @JoiSchema(Schema.username.optional())
  name: string;
}
