import { Allocatable } from '../../entities/AllocatableEntity';
import { Block } from '../../entities/BlockEntity';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

export class AllocatableDTO {
  id: number;
  name: string;
  typeId: number;
  blockId: number;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  blockName?: string;
  items: ItemsAllocatable;

  constructor(
    allocatable: Allocatable,
    items: ItemsAllocatable,
    block?: Block,
  ) {
    this.id = allocatable.id;
    this.name = allocatable.name;
    this.typeId = allocatable.typeId;
    this.blockId = allocatable.blockId;
    this.isDisabled = allocatable.isDisabled;
    this.blockName = block?.name;
    this.createdAt = allocatable.createdAt;
    this.updatedAt = allocatable.updatedAt;
    this.items = items;
  }
}
