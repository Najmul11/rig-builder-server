import { z } from 'zod';

const postReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    review: z.string(),
  }),
});

export const ReviewValivation = {
  postReviewZodSchema,
};
