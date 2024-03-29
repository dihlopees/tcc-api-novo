import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BaseController } from '../controllers/BaseController';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [BaseController],
  exports: [JwtModule],
})
export class BaseModule {}
