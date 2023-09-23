import { Model } from 'mongoose';

export type IProduct = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  status: 'In Stock ' | 'Out of stock';
  keyFeatures: string[];
  ratings: number;
  images: {
    url: string;
    altText: string;
  }[];
};

export type IProductFilters = {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  status?: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
