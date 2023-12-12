import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import setupNestApp from './app.setup';
import { Environment } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const title = 'Impulse api';

  setupNestApp({ app, title });

  const configService = app.get(ConfigService);

  await app.listen(configService.get(Environment.PORT));

  Logger.log(`Server running on port ${configService.get(Environment.PORT)}`);
}

bootstrap();
