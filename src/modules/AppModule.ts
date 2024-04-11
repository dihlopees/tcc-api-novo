import { Module } from '@nestjs/common';
import { Database } from '../configurations/DatabaseConfiguration';
import { AuthenticationModule } from './AuthenticationModule';
import { BaseModule } from './BaseModule';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
