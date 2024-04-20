import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('allocatable')
export class Allocatable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ name: 'type_id' })
  typeId: number;

  // @ManyToOne(() => AllocatableType)
  // type: AllocatableType;

  // @ManyToOne(() => Block, { nullable: true })
  // block: Block;

  @Column({ name: 'block_id' })
  blockId: number;

  @Column({ name: 'items_allocatable_id' })
  itemsAllocatableId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
