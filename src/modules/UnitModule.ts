import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from '../controllers/UnitController';
import { UnitEntity } from '../entities/UnitEntity';
import { UnitService } from '../services/UnitService';

@Module({
  imports: [TypeOrmModule.forFeature([UnitEntity])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
