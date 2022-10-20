import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseBody } from './types/index';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return new ResponseBody(
      200,
      'Users retrieved successfully',
      await this.usersService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);

    return new ResponseBody(200, 'User retrieved successfully', user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new ResponseBody(
      201,
      'User created successfully',
      await this.usersService.create(createUserDto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    return new ResponseBody(
      200,
      'User deleted sucessfully',
      await this.usersService.delete(userId),
    );
  }
}
