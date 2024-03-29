import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './BookingEntity';
import { Extras } from './ExtrasEntity';

@Entity()
export class ReservationHasExtras {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking)
  reservation: Booking;

  @ManyToOne(() => Extras)
  extra: Extras;

  @Column()
  reserved_quantity: number;
}
