import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;
}
