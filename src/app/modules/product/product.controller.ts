/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsyncError from '../../../shared/catchAsyncError';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import httpStatus from 'http-status';
import { ProductService } from './product.service';
import pick from '../../../shared/pick';
import { productFilterableFields } from './product.constant';
import { paginationFields } from '../../../pagination/pagination.constant';

const addProduct = catchAsyncError(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await ProductService.addProduct(payload);

  sendResponse<IProduct>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product added successfully',
    data: result,
  });
});

const getAllProducts = catchAsyncError(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAllProducts(
    filters,
    paginationOptions,
  );

  sendResponse<IProduct[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProductService.getSingleProduct(id);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product retrived successfully',
      data: result,
    });
  },
);

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
};
