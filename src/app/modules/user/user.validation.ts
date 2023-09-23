import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({
      required_error: 'Password is required',
    }),
    fullName: z.string({ required_error: 'Name is required' }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password  is required',
    }),
  }),
});

export const UserValivation = {
  loginUserZodSchema,
  createUserZodSchema,
};
