import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct, Record<string, unknown>>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of stock'],
    required: true,
  },
  keyFeatures: [
    {
      type: String,
      required: true,
    },
  ],
  ratings: {
    type: Number,
  },
  images: {
    type: [String],
  },
});

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
