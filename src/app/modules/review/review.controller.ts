/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsyncError from '../../../shared/catchAsyncError';
import { ReviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import httpStatus from 'http-status';

const postReview = catchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const payload = req.body;

  const result = await ReviewService.postReview(id, user?._id, payload);

  sendResponse<IReview>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review posted successfully',
    data: result,
  });
});

const getReviews = catchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReviewService.getReviews(id);

  sendResponse<IReview[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrived successfully',
    data: result,
  });
});

export const ReviewController = {
  postReview,
  getReviews,
};
