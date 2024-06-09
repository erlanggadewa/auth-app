import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const prefix = 'auth';
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication');

  // Enable Auto Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true, // Temporary Solve: SQL Injection and Cross-site Scripting in class-validator - https://github.com/advisories/GHSA-fj58-h2fr-3pp2
    }),
  );

  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Public Auth API')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${prefix}/api`, app, document);

  await app.listen(3000);
  logger.verbose(`Application is running on: ${await app.getUrl()}/${prefix}`);
  logger.verbose(`Swagger is running on: ${await app.getUrl()}/${prefix}/api`);
}
bootstrap();
