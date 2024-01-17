import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AUTH_CLIENT_ID } from 'common';

@Controller()
export class BillingController implements OnModuleInit {
  constructor(
    private readonly billingService: BillingService,
    //(step 2), subscribe to the authClient who will send the response from the beginning
    @Inject(AUTH_CLIENT_ID) private readonly authClient: ClientKafka,
  ) {}

  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    this.billingService.handleOrderCreated(data);
  }

  onModuleInit() {
    //(step3 we subscribe to the response by the topic: get_user)
    this.authClient.subscribeToResponseOf('get_user');
  }
}
