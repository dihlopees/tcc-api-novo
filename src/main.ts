import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});
  await app.listen(3000);
}
bootstrap();
