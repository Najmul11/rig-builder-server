import { z } from 'zod';

const postReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id is required' }),
    rating: z.number().optional(),
    review: z.string(),
  }),
});

export const ReviewValivation = {
  postReviewZodSchema,
};
