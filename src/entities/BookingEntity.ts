import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Allocatable } from './AllocatableEntity';
import { Course } from './CourseEntity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'booked_for_user_id', nullable: true })
  bookedForUserId: number;

  @Column({ name: 'reservation_color' })
  reservationColor: string;

  @Column({ name: 'course_id', nullable: true })
  courseId: number;

  @Column({ name: 'allocatable_id' })
  allocatableId: number;

  @ManyToOne(() => Course, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Allocatable)
  @JoinColumn({ name: 'allocatable_id' })
  allocatable: Allocatable;
}
