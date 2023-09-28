"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        category: zod_1.z.string({ required_error: 'Category is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        status: zod_1.z.enum(['In Stock', 'Out of stock'], {
            required_error: 'Status is required',
        }),
        keyFeatures: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Key features are required',
        }),
        ratings: zod_1.z
            .object({
            average: zod_1.z.number(),
            count: zod_1.z.number(),
        })
            .optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            user: zod_1.z.string(),
            rating: zod_1.z.number(),
            review: zod_1.z.string(),
        }))
            .optional(),
        images: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string(),
            altText: zod_1.z.string(),
        })),
    }),
});
exports.ProductValidation = {
    createProductSchema,
};
