import { Allocatable } from '../../entities/AllocatableEntity';
import { ItemsAllocatable } from './itemsAllocatable/ItemsAllocatableDTO';

export class AllocatableDTO {
  name: string;
  typeId: number;
  blockId: number;
  items: ItemsAllocatable;

  constructor(allocatable: Allocatable, items: ItemsAllocatable) {
    this.name = allocatable.name;
    this.typeId = allocatable.typeId;
    this.blockId = allocatable.blockId;
    this.items = items;
  }
}
