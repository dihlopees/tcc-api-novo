import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './BookingEntity';
import { Extras } from './ExtrasEntity';

@Entity()
export class ReservationHasExtras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reservation_id' })
  reservationId: number;

  @Column({ name: 'extra_id' })
  extraId: number;

  @Column({ name: 'reserved_quantity' })
  reservedQuantity: number;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Booking;

  @ManyToOne(() => Extras)
  @JoinColumn({ name: 'extra_id' })
  extra: Extras;
}
