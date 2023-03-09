import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { generateSwaggerDocs } from './utils/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  generateSwaggerDocs(app);
  await app.listen(3000);
}
bootstrap();
