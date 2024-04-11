import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UnitEntity } from './UnitEntity';

@Entity()
export class Extras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToOne(() => UnitEntity)
  unit: UnitEntity;

  @Column()
  available_quantity: number;
}
