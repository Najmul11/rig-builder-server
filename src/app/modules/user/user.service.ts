/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUserLoginResponse } from '../../../jwt/jwt.interface';
import { IUser, IUserLogin } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../jwt/jwtHelper';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const { email } = user;
  const userExist = await User.findOne({ email });
  if (userExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');

  const result = await User.create(user);
  const sanitizedResult = await User.findById(result._id).select('-password');
  return sanitizedResult;
};

const userLogin = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Password is incorrect');
  }

  // create access token , refresh token
  const { _id, fullName } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, fullName },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, fullName },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getProfile = async (id: string): Promise<Partial<IUser> | null> => {
  const result = await User.findById(id).select('-password');
  return result;
};

export const UserService = {
  createUser,
  userLogin,
  getProfile,
};
