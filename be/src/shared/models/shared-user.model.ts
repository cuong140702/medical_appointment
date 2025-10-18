import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  password: z.string().min(6).max(100),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  roleId: z.number(),
  avatarUrl: z.string().nullable().optional(),
  isOnline: z.boolean(),
  lastSeen: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
