import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_CLIENT_ID, AUTH_SERVICE } from 'common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: AUTH_CLIENT_ID,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
