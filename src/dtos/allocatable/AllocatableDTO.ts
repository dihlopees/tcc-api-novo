import { Allocatable } from '../../entities/AllocatableEntity';
import { Block } from '../../entities/BlockEntity';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

export class AllocatableDTO {
  name: string;
  typeId: number;
  blockId: number;
  isDisabled: boolean;
  items: ItemsAllocatable;
  blockName?: string;

  constructor(
    allocatable: Allocatable,
    items: ItemsAllocatable,
    block?: Block,
  ) {
    this.name = allocatable.name;
    this.typeId = allocatable.typeId;
    this.blockId = allocatable.blockId;
    this.isDisabled = allocatable.isDisabled;
    this.items = items;
    this.blockName = block?.name;
  }
}
