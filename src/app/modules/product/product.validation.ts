import { z } from 'zod';

const createProductSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    category: z.string({ required_error: 'Category is required' }),
    price: z.number({ required_error: 'Price is required' }),
    status: z.enum(['In Stock', 'Out of stock'], {
      required_error: 'Status is required',
    }),
    keyFeatures: z.array(z.string(), {
      required_error: 'Key features are required',
    }),
    ratings: z
      .object({
        average: z.number(),
        count: z.number(),
      })
      .optional(),
    reviews: z
      .array(
        z.object({
          user: z.string(),
          rating: z.number(),
          review: z.string(),
        }),
      )
      .optional(),
    images: z.array(z.string()),
  }),
});

export const ProductValidation = {
  createProductSchema,
};
