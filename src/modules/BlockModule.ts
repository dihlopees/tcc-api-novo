import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockController } from '../controllers/BlockController';
import { Block } from '../entities/BlockEntity';
import { BlockService } from '../services/BlockService';

@Module({
  imports: [TypeOrmModule.forFeature([Block])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
