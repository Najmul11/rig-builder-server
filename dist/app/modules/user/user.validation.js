'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValivation = void 0;
const zod_1 = require('zod');
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required' }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
    fullName: zod_1.z.string({ required_error: 'Name is required' }),
  }),
});
const loginUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string({
      required_error: 'Email is required',
    }),
    password: zod_1.z.string({
      required_error: 'Password  is required',
    }),
  }),
});
exports.UserValivation = {
  loginUserZodSchema,
  createUserZodSchema,
};
