import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3).max(255).trim(),
  email: z.string().toLowerCase().email().trim(),
  password: z.string().min(8).max(255),
  role: z.enum(['user', 'admin']).default('user'),
});

export const signinSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8).max(255),
});
