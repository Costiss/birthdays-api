import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateSwaggerDocs(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Birthdays API')
    .setDescription('Birthdays API for Discord Bot')
    .setVersion('1.0')
    .addTag('Birthdays')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument);
}
