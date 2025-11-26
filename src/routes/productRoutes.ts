import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  filterProducts,
  getAllProducts,
  updateProduct,
} from '../controllers/productСontroller';
import { validateBody } from '../middlewares/validateBody';
import { productSchema } from '../schemas/product';

const router = Router();

router.get('/all', getAllProducts);

router.get('/', validateBody(productSchema), filterProducts);

router.post('/', validateBody(productSchema), createProduct);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProduct);

export default router;
