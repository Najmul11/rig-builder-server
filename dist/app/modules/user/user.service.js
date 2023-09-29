"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../jwt/jwtHelper");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const userExist = yield user_model_1.User.findOne({ email });
    if (userExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exist');
    const result = yield user_model_1.User.create(user);
    const sanitizedResult = yield user_model_1.User.findById(result._id).select('-password');
    return sanitizedResult;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(yield user.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, ' Password is incorrect');
    }
    // create access token , refresh token
    const { _id, fullName } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ _id, fullName }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ _id, fullName }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id).select('-password');
    return result;
});
exports.UserService = {
    createUser,
    userLogin,
    getProfile,
};
