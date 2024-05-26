import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReservationHasExtras } from './ReservationHasExtrasEntity';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => ReservationHasExtras,
    (bookingHasExtras) => bookingHasExtras.extra,
  )
  bookingHasExtras: ReservationHasExtras[];
}
