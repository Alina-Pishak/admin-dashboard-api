// routes/user.ts
import { Router } from 'express';
import {
  getUserInfo,
  loginUser,
  logoutUser,
  refreshUserToken,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';
import { validateBody } from '../middlewares/validateBody';
import { loginSchema } from '../schemas/user';
const router = Router();

// Login
router.post('/login', validateBody(loginSchema), loginUser);

// Refresh access token
router.post('/refresh', refreshUserToken);

// Logout
router.post('/logout', logoutUser);

// Get user info
router.get("/user-info", authMiddleware, getUserInfo);

export default router;
