import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('extras')
export class Extras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ name: 'available_quantity' })
  availableQuantity: number;

  @Column({ name: 'unit_id' })
  unitId: number;
}
