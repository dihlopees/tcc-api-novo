import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;
}
