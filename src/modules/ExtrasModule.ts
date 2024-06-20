import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtrasController } from '../controllers/ExtrasController';
import { Allocatable } from '../entities/AllocatableEntity';
import { Booking } from '../entities/BookingEntity';
import { Extras } from '../entities/ExtrasEntity';
import { ReservationHasExtras } from '../entities/ReservationHasExtrasEntity';
import { UnitEntity } from '../entities/UnitEntity';
import { ExtrasService } from '../services/ExtrasService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Extras,
      UnitEntity,
      Allocatable,
      Booking,
      ReservationHasExtras,
    ]),
  ],
  controllers: [ExtrasController],
  providers: [ExtrasService],
})
export class ExtrasModule {}
