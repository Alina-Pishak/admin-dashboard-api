// routes/user.ts
import { Router } from 'express';
import { getUserInfo, loginUser, logoutUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';
import { validateBody } from '../middlewares/validateBody';
import { loginSchema } from '../schemas/user';
const router = Router();

// Login
router.post('/login', validateBody(loginSchema), loginUser);

// Logout
router.get('/logout', authMiddleware, logoutUser);

// Get user info
router.get("/user-info", authMiddleware, getUserInfo);

export default router;
