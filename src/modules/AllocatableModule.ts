import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocatableController } from '../controllers/AllocatableController';
import { Allocatable } from '../entities/AllocatableEntity';
import { ItemsAllocatable } from '../entities/ItemsAllocatable';
import { AllocatableService } from '../services/AllocatableService';

@Module({
  imports: [TypeOrmModule.forFeature([Allocatable, ItemsAllocatable])],
  controllers: [AllocatableController],
  providers: [AllocatableService],
})
export class AllocatableModule {}
