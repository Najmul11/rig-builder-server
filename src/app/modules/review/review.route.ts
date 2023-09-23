import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValivation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/post-review/:id',
  auth,
  validateRequest(ReviewValivation.postReviewZodSchema),
  ReviewController.postReview,
);

router.get('/:id', ReviewController.getReviews);

export const ReviewRoutes = router;
