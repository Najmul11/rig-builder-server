import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValivation } from './user.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValivation.createUserZodSchema),
  UserController.createuser,
);
router.post(
  '/login',
  validateRequest(UserValivation.loginUserZodSchema),
  UserController.userLogin,
);

router.get('/my-profile', auth, UserController.getProfile);

export const UserRoutes = router;
