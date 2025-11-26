import { Router } from 'express';
import { getOrders } from '../controllers/orderСontroller';

const router = Router();

router.get('/', getOrders);

export default router;
