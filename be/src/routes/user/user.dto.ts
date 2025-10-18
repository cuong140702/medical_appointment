import { createZodDto } from 'nestjs-zod';
import {
  GetUsersQuerySchema,
  GetUsersResSchema,
  LoginBodySchema,
  LoginResSchema,
} from './user.model';

export class GetUsersResDTO extends createZodDto(GetUsersResSchema) {}
export class GetUsersQueryDTO extends createZodDto(GetUsersQuerySchema) {}
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}
