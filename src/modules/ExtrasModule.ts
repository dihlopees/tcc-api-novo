import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtrasController } from '../controllers/ExtrasController';
import { Allocatable } from '../entities/AllocatableEntity';
import { Extras } from '../entities/ExtrasEntity';
import { UnitEntity } from '../entities/UnitEntity';
import { ExtrasService } from '../services/ExtrasService';

@Module({
  imports: [TypeOrmModule.forFeature([Extras, UnitEntity, Allocatable])],
  controllers: [ExtrasController],
  providers: [ExtrasService],
})
export class ExtrasModule {}
