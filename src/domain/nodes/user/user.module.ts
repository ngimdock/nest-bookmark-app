import { Module } from '@nestjs/common';
import { UserRepository } from './user.service';

@Module({
  providers: [UserRepository],
})
export class UserModule {}
