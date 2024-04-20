import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class CreateCourseDTO {
  @JoiSchema(Schema.username.required())
  name: string;
}
