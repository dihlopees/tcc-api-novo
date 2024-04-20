import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemsAllocatable } from './ItemsAllocatable';

@Entity('allocatable')
export class Allocatable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ name: 'block_id' })
  blockId: number;

  @Column({ name: 'items_allocatable_id' })
  itemsAllocatableId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => ItemsAllocatable)
  @JoinColumn({ name: 'items_allocatable_id' })
  items: ItemsAllocatable;
}
