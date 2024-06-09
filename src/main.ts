import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Auto Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true, // Temporary Solve: SQL Injection and Cross-site Scripting in class-validator - https://github.com/advisories/GHSA-fj58-h2fr-3pp2
    }),
  );
  await app.listen(3000);
}
bootstrap();
