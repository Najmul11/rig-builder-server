'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewService = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const product_model_1 = require('../product/product.model');
const user_model_1 = require('../user/user.model');
const review_model_1 = require('./review.model');
const mongoose_1 = __importDefault(require('mongoose'));
const postReview = (productId, user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    const userExist = yield user_model_1.User.findById(user);
    const existingReview = yield review_model_1.Review.findOne({
      productId,
      user,
    });
    if (!product)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Product do not exist',
      );
    if (!userExist)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'User do not exist',
      );
    let newReviewAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      yield session.startTransaction();
      if (existingReview) {
        yield review_model_1.Review.findByIdAndUpdate(existingReview._id, {
          review:
            payload === null || payload === void 0 ? void 0 : payload.review,
          rating:
            (payload === null || payload === void 0
              ? void 0
              : payload.rating) || 1,
        }).session(session);
        newReviewAllData = existingReview;
      } else {
        const newPayload = {
          productId,
          user,
          review:
            payload === null || payload === void 0 ? void 0 : payload.review,
          rating:
            (payload === null || payload === void 0
              ? void 0
              : payload.rating) || 1,
        };
        const newReview = yield review_model_1.Review.create([newPayload], {
          session,
        });
        if (!newReview.length) {
          throw new ApiError_1.default(
            http_status_1.default.BAD_REQUEST,
            'Failed to post review',
          );
        }
        newReviewAllData = newReview[0];
      }
      const productReviews = yield review_model_1.Review.find({}).session(
        session,
      );
      const totalRating = productReviews.reduce(
        (acc, review) => acc + review.rating,
        0,
      );
      const newProductRating = Math.round(totalRating / productReviews.length);
      yield product_model_1.Product.findByIdAndUpdate(productId, {
        ratings: newProductRating,
      }).session(session);
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newReviewAllData) {
      newReviewAllData = yield review_model_1.Review.findById(
        newReviewAllData._id,
      ).populate('user', '-password');
    }
    return newReviewAllData;
  });
const getReviews = productId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ productId }).populate(
      'user',
      '-password',
    );
    return result;
  });
exports.ReviewService = {
  postReview,
  getReviews,
};
