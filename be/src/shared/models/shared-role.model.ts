import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  description: z.string().nullable(),
  deletedAt: z.date().nullable(),
});

export type RoleType = z.infer<typeof RoleSchema>;
