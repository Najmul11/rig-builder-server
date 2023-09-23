/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../pagination/pagination.interface';
import { paginationHelpers } from '../../../pagination/paginationHelpers';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';
import { productSearchableFields } from './product.constant';

const addProduct = async (payload: IProduct): Promise<IProduct | null> => {
  payload.ratings = 0;
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice) {
    andConditions.push({ price: { $gte: parseFloat(minPrice) } });
  }

  if (maxPrice) {
    andConditions.push({ price: { $lte: parseFloat(maxPrice) } });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const total = await Product.countDocuments(whereConditions);

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProduct = async (
  productId: string,
): Promise<IProduct | null> => {
  const result = await Product.findById(productId);
  return result;
};

export const ProductService = {
  addProduct,
  getAllProducts,
  getSingleProduct,
};
