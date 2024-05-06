import { Allocatable } from '../../entities/AllocatableEntity';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

export class AllocatableDTO {
  name: string;
  typeId: number;
  blockId: number;
  isDisabled: boolean;
  items: ItemsAllocatable;

  constructor(allocatable: Allocatable, items: ItemsAllocatable) {
    this.name = allocatable.name;
    this.typeId = allocatable.typeId;
    this.blockId = allocatable.blockId;
    this.isDisabled = allocatable.isDisabled;
    this.items = items;
  }
}
