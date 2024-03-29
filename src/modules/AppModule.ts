import { Module } from '@nestjs/common';
import { Database } from '../configurations/DatabaseConfiguration';
import { AuthenticationModule } from './AuthenticationModule';
import { BaseModule } from './BaseModule';
import { UserModule } from './UserModule';

@Module({
  imports: [Database, AuthenticationModule, BaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
