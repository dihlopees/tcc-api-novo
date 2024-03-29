import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Allocatable } from './AllocatableEntity';

@Entity()
export class AllocatableHasAvailableTime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Allocatable)
  allocatable: Allocatable;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  day_of_week: number;
}
