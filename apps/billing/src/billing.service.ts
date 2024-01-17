import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';
import { AUTH_CLIENT_ID } from 'common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject(AUTH_CLIENT_ID) private readonly authClient: ClientKafka,
  ) {}

  // when using the ClientKafka and want to receive a message but also wait for confirmation,
  //we need MessagePattern()
  //a reply is its own topic
  // we send a message in a topic and the reply belogs to different topic
  // we need nestjs to subscribe to that reply event topic
  // So in that case, we need to subscribe this microservice to that topic too. That
  //should be done in the controller. (step 1)

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    console.log(orderCreatedEvent);
    //(step4) is for sending the message to the auth client with the get_user topic
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(`billing user with id : ${user.stripeUserId} was charged with
      $${orderCreatedEvent.price}
      `);
      });
    //(setp5) we receive an observable from the send method so we subscribe to receive the response back.
  }
}
