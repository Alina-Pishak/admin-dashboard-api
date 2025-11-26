import { Router } from 'express';
import { getCustomers } from '../controllers/customerController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// GET list of customers
router.get('/', authMiddleware, getCustomers);

export default router;
