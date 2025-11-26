import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
} from '../controllers/supplierController';
import { authMiddleware } from '../middlewares/auth';
import { validateBody } from '../middlewares/validateBody';
import { supplierSchema } from '../schemas/supplier';

const router = Router();

router.get('/', getSuppliers);
router.post('/', authMiddleware, validateBody(supplierSchema), createSupplier);
router.put(
  '/:supplierId',
  authMiddleware,
  validateBody(supplierSchema),
  updateSupplier,
);

export default router;
