import { Router } from 'express';

import { getDashboardData } from '../controllers/dashboardConroller';

const router = Router();

router.get('/', getDashboardData);

export default router;
