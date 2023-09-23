/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type IUserLogin = {
  email: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
