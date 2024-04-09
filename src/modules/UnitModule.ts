import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from '../controllers/UnitController';
import { RoleEntity } from '../entities/RoleEntity';
import { UserEntity } from '../entities/UserEntity';
import { UnitService } from '../services/UnitService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UnitService])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
