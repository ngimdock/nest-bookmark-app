import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/nodes/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Find all user
   * @returns
   */
  async findAll() {
    return await this.userRepository.findAll();
  }

  async delete(userId: string) {
    return this.userRepository.deleteUser(userId);
  }

  /**
   * Find one user by id
   * @param userId string
   */
  async findOneById(userId: string) {
    return await this.userRepository.findOneById(userId);
  }

  /**
   * create user account
   * @param createUserData
   * @returns
   */
  async create(createUserData: CreateUserDto) {
    try {
      const passwordHash = await argon2.hash(createUserData.password);

      console.log({ passwordHash });

      return await this.userRepository.create({
        ...createUserData,
        id: uuid(),
        passwordHash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isEmailVerified: false,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
