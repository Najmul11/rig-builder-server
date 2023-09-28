'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Review = void 0;
const mongoose_1 = require('mongoose');
const ReviewSchema = new mongoose_1.Schema({
  productId: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose_1.Schema.Types.ObjectId,
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
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
