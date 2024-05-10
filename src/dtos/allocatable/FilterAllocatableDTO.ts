import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';

JoiSchemaOptions({ allowUnknown: false });
export class FilterAllocatableDTO {
  @JoiSchema(Schema.username.optional())
  name: string;

  @JoiSchema(Schema.id.optional())
  typeId: number;

  @JoiSchema(Schema.id.optional())
  blockId: number;

  @JoiSchema(Schema.isDisabled.optional())
  isDisabled: boolean = false;
}
