import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const Database: DynamicModule = TypeOrmModule.forRootAsync({
  useFactory: async () => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tcc',
    logging: false,
    entities: ['dist/entities/*{.ts,.js}'],
  }),
});
