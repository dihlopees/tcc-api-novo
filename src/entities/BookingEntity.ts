import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Allocatable } from './AllocatableEntity';
import { Course } from './CourseEntity';
import { UserEntity } from './UserEntity';

//filtrar agendamentos por horario

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, { nullable: true })
  course: Course;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => Allocatable)
  allocatable: Allocatable;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  booked_for_user_id: number;
}
