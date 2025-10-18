import { RoleSchema } from 'src/shared/models/shared-role.model';
import { UserSchema } from 'src/shared/models/shared-user.model';
import z from 'zod';

export const GetUsersResSchema = z.object({
  data: z.array(
    UserSchema.omit({ password: true }).extend({
      role: RoleSchema.pick({
        id: true,
        name: true,
      }),
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetUsersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict();

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema.pick({
    id: true,
    email: true,
    name: true,
    phone: true,
  }).extend({
    role: z.string().nullable(),
  }),
});

export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
