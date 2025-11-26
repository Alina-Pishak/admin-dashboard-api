import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
} from '../controllers/supplierController';
import { validateBody } from '../middlewares/validateBody';
import { supplierSchema } from '../schemas/supplier';

const router = Router();

router.get('/', getSuppliers);
router.post('/', validateBody(supplierSchema), createSupplier);
router.put('/:supplierId', validateBody(supplierSchema), updateSupplier);

export default router;
