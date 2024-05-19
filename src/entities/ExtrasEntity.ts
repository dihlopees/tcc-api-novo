import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(
    () => ReservationHasExtras,
    (bookingHasExtras) => bookingHasExtras.extra,
  )
  bookingHasExtras: ReservationHasExtras[];
}
