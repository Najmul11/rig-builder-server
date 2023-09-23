import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router = express.Router();

router.get('/:id', ProductController.getSingleProduct);

router.post(
  '/add-product',
  validateRequest(ProductValidation.createProductSchema),
  ProductController.addProduct,
);

router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
