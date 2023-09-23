import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const ReviewSchema = new Schema<IReview, Record<string, unknown>>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
});

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
