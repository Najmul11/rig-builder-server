'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewValivation = void 0;
const zod_1 = require('zod');
const postReviewZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    userId: zod_1.z.string({ required_error: 'User id is required' }),
    rating: zod_1.z.number().optional(),
    review: zod_1.z.string(),
  }),
});
exports.ReviewValivation = {
  postReviewZodSchema,
};
