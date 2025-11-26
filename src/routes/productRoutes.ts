import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  filterProducts,
  getAllProducts,
  updateProduct,
} from '../controllers/productСontroller';
import { authMiddleware } from '../middlewares/auth';
import { validateBody } from '../middlewares/validateBody';
import { productSchema } from '../schemas/product';

const router = Router();

router.get('/all', authMiddleware, getAllProducts);

router.get('/', authMiddleware, filterProducts);

router.post('/', authMiddleware, validateBody(productSchema), createProduct);

router.put(
  '/:productId',
  authMiddleware,
  validateBody(productSchema),
  updateProduct,
);

router.delete('/:productId', authMiddleware, deleteProduct);

export default router;
