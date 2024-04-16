import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { UserEntity } from '../entities/UserEntity';
import { AuthenticationService } from '../services/AuthenticationService';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'ASDHASDÇLÇLPOPOEWQ',
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
