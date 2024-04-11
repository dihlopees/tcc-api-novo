import { Module } from '@nestjs/common';
import { Database } from '../configurations/DatabaseConfiguration';
import { AuthenticationModule } from './AuthenticationModule';
import { BaseModule } from './BaseModule';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
