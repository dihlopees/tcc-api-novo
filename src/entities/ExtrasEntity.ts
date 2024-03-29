import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Unit } from './UnitEntity';

@Entity()
export class Extras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToOne(() => Unit)
  unit: Unit;

  @Column()
  available_quantity: number;
}
