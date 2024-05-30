import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });
 
  
  const configService = app.get(ConfigService);

  // Default to 3000 if PORT is not set
  const port = configService.get<number>('PORT', 3000);

  app.enableCors();

  await app.listen(port);

  app.enableCors();

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
