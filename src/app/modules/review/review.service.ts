/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { IReview } from './review.interface';
import { Review } from './review.model';
import mongoose from 'mongoose';

const postReview = async (
  productId: string,
  user: string,
  payload: IReview,
) => {
  const product = await Product.findById(productId);
  const userExist = await User.findById(user);
  const existingReview = await Review.findOne({ productId, user });

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product do not exist');
  if (!userExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User do not exist');

  let newReviewAllData = null;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    if (existingReview) {
      await Review.findByIdAndUpdate(existingReview._id, {
        review: payload?.review,
        rating: payload?.rating || 1,
      }).session(session);

      newReviewAllData = existingReview;
    } else {
      const newPayload = {
        productId,
        user,
        review: payload?.review,
        rating: payload?.rating || 1,
      };

      const newReview = await Review.create([newPayload], { session });
      if (!newReview.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to post review');
      }

      newReviewAllData = newReview[0];
    }

    const productReviews = await Review.find({}).session(session);

    const totalRating = productReviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );

    const newProductRating = Math.round(totalRating / productReviews.length);

    await Product.findByIdAndUpdate(productId, {
      ratings: newProductRating,
    }).session(session);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }

  if (newReviewAllData) {
    newReviewAllData = await Review.findById(newReviewAllData._id).populate(
      'user',
      '-password',
    );
  }

  return newReviewAllData;
};

const getReviews = async (productId: string): Promise<IReview[] | null> => {
  const result = await Review.find({ productId }).populate('user', '-password');
  return result;
};

export const ReviewService = {
  postReview,
  getReviews,
};
