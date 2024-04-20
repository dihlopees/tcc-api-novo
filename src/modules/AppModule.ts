import { Module } from '@nestjs/common';
import { Database } from '../configurations/DatabaseConfiguration';
import { AllocatableModule } from './AllocatableModule';
import { AllocatableTypeModule } from './AllocatableTypeModule';
import { AuthenticationModule } from './AuthenticationModule';
import { BaseModule } from './BaseModule';
import { BlockModule } from './BlockModule';
import { CourseModule } from './CourseModule';
import { ExtrasModule } from './ExtrasModule';
import { UnitModule } from './UnitModule';
import { UserModule } from './UserModule';

@Module({
  imports: [
    Database,
    AuthenticationModule,
    BaseModule,
    UserModule,
    UnitModule,
    ExtrasModule,
    CourseModule,
    BlockModule,
    AllocatableTypeModule,
    AllocatableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
