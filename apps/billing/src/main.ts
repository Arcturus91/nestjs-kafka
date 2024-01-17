import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BillingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:29092'],
        },
        consumer: {
          groupId: 'billing-consumer',
        },
      },
    },
  );
  app.listen();
  //its better to use app.listen when u are creating a single microservice as in the code above
}
bootstrap();
