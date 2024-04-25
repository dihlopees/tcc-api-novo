import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

JoiSchemaOptions({ allowUnknown: false });
export class EditAllocatableDTO {
  @JoiSchema(Schema.username.required())
  name: string;

  @JoiSchema(Schema.id.optional())
  typeId: number;

  @JoiSchema(Schema.id.optional())
  blockId: number;

  @JoiSchema(Schema.itemsAllocatable.optional())
  items: ItemsAllocatable;
}
