import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('allocatable_type')
export class AllocatableType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  type: string;
}
