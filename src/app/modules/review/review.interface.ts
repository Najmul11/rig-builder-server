import { Model, Types } from 'mongoose';

export type IReview = {
  productId: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  review?: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
