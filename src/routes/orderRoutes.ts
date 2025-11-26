import { Router } from 'express';
import { getOrders } from '../controllers/orderСontroller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, getOrders);

export default router;
