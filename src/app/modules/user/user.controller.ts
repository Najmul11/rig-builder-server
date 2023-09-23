import { Request, Response } from 'express';
import catchAsyncError from '../../../shared/catchAsyncError';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import config from '../../../config';

const createuser = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserService.createUser(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const userLogin = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserService.userLogin(user);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === ' production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: others,
  });
});

const getProfile = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserService.getProfile(user?._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrived  successfully',
    data: result,
  });
});

export const UserController = {
  createuser,
  userLogin,
  getProfile,
};
