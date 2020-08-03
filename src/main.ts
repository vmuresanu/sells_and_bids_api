import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const port = process.env.port || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log(`Microservice Sells and Bids is listening on http://localhost:${port}`, 'Bootstrap')
}
bootstrap();
