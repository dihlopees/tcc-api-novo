import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from '../configurations/DatabaseConfiguration';
import { UserEntity } from '../entities/UserEntity';
import { AuthMiddleware } from '../middlewares/AuthenticationMiddlewares';
import { AllocatableModule } from './AllocatableModule';
import { AllocatableTypeModule } from './AllocatableTypeModule';
import { AuthenticationModule } from './AuthenticationModule';
import { BaseModule } from './BaseModule';
import { BlockModule } from './BlockModule';
import { BookingModule } from './BookingModule';
import { CourseModule } from './CourseModule';
import { ExtrasModule } from './ExtrasModule';
import { UnitModule } from './UnitModule';
import { UserModule } from './UserModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
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
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/auth/login', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
