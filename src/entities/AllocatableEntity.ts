import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AllocatableType } from './AllocatableTypeEntity';
import { Block } from './BlockEntity';

@Entity()
export class Allocatable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToOne(() => AllocatableType)
  type: AllocatableType;

  @ManyToOne(() => Block, { nullable: true })
  block: Block;

  @Column({ nullable: true })
  seats_quantity: number;

  @Column({ nullable: true })
  multimedia_quantity: number;

  @Column({ nullable: true })
  outlets_quantity: number;

  @Column({ nullable: true })
  air_conditioners_quantity: number;

  @Column({ nullable: true })
  allows_transmission: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
