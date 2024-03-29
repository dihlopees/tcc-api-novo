import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AllocatableType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  type: string;
}
