import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocatableTypeController } from '../controllers/AllocatableTypeController';
import { AllocatableType } from '../entities/AllocatableTypeEntity';
import { AllocatableTypeService } from '../services/AllocatableTypeService';

@Module({
  imports: [TypeOrmModule.forFeature([AllocatableType])],
  controllers: [AllocatableTypeController],
  providers: [AllocatableTypeService],
})
export class AllocatableTypeModule {}
