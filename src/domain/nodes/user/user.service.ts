import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { CreateUserBdDto } from 'src/users/dto/create-user.dto';
import { User } from './entities/user.entity';

type UserResponseType = Promise<User> | null;

@Injectable()
export class UserRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  /**
   * Get all users
   */
  async findAll(): Promise<User[]> {
    const query = await this.neo4jService.initQuery();

    try {
      const result = await query.matchNode('user', 'User').return('user').run();

      return result.map((user) => new User(user['user'].properties));
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  /**
   * Find user by id
   * @param userId
   * @returns
   */
  async findOneById(userId: string): UserResponseType {
    const query = this.neo4jService.initQuery();

    const result = await query
      .matchNode('user', 'User')
      .where({ user: { id: userId } })
      .return('user')
      .run();

    if (!result.length)
      throw new NotFoundException(`User with id ${userId} not found`);

    const userData = result[0]['user'].properties;

    return new User({ ...userData, password: undefined });
  }

  async checkUserExist(userId: string): Promise<boolean> {
    const query = this.neo4jService.initQuery();

    try {
      const result = await query
        .matchNode('user', 'User')
        .where({ user: { id: userId } })
        .return('user')
        .run();

      if (!result.length) return false;

      return true;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  /**
   * create user node
   * @param createUserData
   */
  async create(createUserData: CreateUserBdDto): UserResponseType {
    const query = this.neo4jService.initQuery();

    try {
      const result = await query
        .createNode('user', 'User', createUserData)
        .return('user')
        .run();

      if (!result.length)
        throw new HttpException(new Error('something went wrong'), 500);

      const userData = result[0]['user'].properties;

      return new User({ ...userData });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    const query = this.neo4jService.initQuery();
    try {
      const userExist = await this.checkUserExist(userId);

      if (!userExist)
        throw new NotFoundException(`User with id ${userId} not found`);

      const result = await query
        .matchNode('user', 'User')
        .where({ user: { id: userId } })
        .delete('user')
        .return('user')
        .run();

      console.log({ result });

      return true;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
