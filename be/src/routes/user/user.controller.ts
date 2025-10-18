import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  GetUsersQueryDTO,
  GetUsersResDTO,
  LoginBodyDTO,
  LoginResDTO,
} from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ZodSerializerDto(GetUsersResDTO)
  list(@Query() query: GetUsersQueryDTO) {
    return this.userService.list({
      page: query.page,
      limit: query.limit,
    });
  }

  @Post('login')
  @ZodSerializerDto(LoginResDTO)
  login(@Body() body: LoginBodyDTO) {
    return this.userService.login(body as { email: string; password: string });
  }
}
