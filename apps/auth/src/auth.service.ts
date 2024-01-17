import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './get-user-request';

@Injectable()
export class AuthService {
  private readonly users: any[] = [
    {
      userId: '123',
      stripeUserId: '121334',
    },
    {
      userId: '456',
      stripeUserId: '42342',
    },
  ];

  getUser(getUserRequest: GetUserRequest) {
    return this.users.find((user) => user.userId === getUserRequest.userId);
  }
}
