import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request.dto';
import { BILLING_SERVICE } from 'common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
