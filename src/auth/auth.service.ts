import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { message: 'user is signup' };
  }

  signin() {
    return { message: 'user is signin' };
  }
}
