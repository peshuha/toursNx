/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/module/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from './app/config/config.service';

async function bootstrap() {

  // Создаем экземпляр приложения
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors();
  // Доступ к public ресурсам
  console.log("bootstrap", ConfigService.Config().public_img.path, ConfigService.Config().public_img.prefix)
  app.useStaticAssets(ConfigService.Config().public_img.path, {prefix: ConfigService.Config().public_img.prefix});
  // Общие настройки сервака
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
