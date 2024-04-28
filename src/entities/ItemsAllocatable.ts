import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items_allocatable')
export class ItemsAllocatable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seats_quantity', nullable: true })
  seatsQuantity: number;

  @Column({ name: 'multimedia_quantity', nullable: true })
  multimediaQuantity: number;

  @Column({ name: 'outlets_quantity', nullable: true })
  outletsQuantity: number;

  @Column({ name: 'air_conditioners_quantity', nullable: true })
  airConditionersQuantity: number;

  @Column({ name: 'allows_transmission', nullable: true })
  allowsTransmission: boolean;

  @Column({ name: 'plate', nullable: true })
  plate: string;

  @Column({ name: 'color', nullable: true })
  color: string;
}
