import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BILLING_CLIENT_ID, BILLING_SERVICE } from 'common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BILLING_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: BILLING_CLIENT_ID,
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'billing-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
