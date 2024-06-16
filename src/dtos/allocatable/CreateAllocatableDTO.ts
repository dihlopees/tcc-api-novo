import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

JoiSchemaOptions({ allowUnknown: false });
export class CreateAllocatableDTO {
  @JoiSchema(Schema.username.required())
  name: string;

  @JoiSchema(Schema.id.required())
  typeId: number;

  @JoiSchema(Schema.blockId.optional())
  blockId: number | null;

  @JoiSchema(Schema.itemsAllocatable.optional())
  items?: ItemsAllocatable;
}
