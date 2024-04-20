import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('block')
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ name: 'unit_id' })
  unitId: number;
}
