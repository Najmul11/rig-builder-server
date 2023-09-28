'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Product = void 0;
const mongoose_1 = require('mongoose');
const ProductSchema = new mongoose_1.Schema({
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
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        required: true,
      },
    },
  ],
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
