import { Router } from 'express';
import { getCustomers } from '../controllers/customerController';

const router = Router();

// GET list of customers
router.get('/', getCustomers);

export default router;
