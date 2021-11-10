import { Controller, Body, Post, Get, Param, UnprocessableEntityException } from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { identity } from 'rxjs';

@Controller()
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create-user')
  createUser(@Body() data: CreateUserDTO): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  @Post('create-admin')
  createAdmin(@Body() data: CreateUserDTO): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('find-all')
  findMany() {
    return this.service.findMany();
  }
}
