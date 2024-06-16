import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Schema } from '../../schemas/Schema';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

JoiSchemaOptions({ allowUnknown: false });
export class EditAllocatableDTO {
  @JoiSchema(Schema.username.optional())
  name: string;

  @JoiSchema(Schema.id.optional())
  typeId: number;

  @JoiSchema(Schema.blockId.optional())
  blockId: number;

  @JoiSchema(Schema.itemsAllocatable.optional())
  items: ItemsAllocatable;

  @JoiSchema(Schema.isDisabled.optional())
  isDisabled: boolean;
}
