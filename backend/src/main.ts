import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main est pour démarer le serveur
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
