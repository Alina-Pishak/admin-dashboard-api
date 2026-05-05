import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { AuthRequest } from '../middlewares/auth';

const REFRESH_COOKIE_NAME = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

/** Cookie must work for POST /refresh and POST /logout → path /api/users */
const REFRESH_COOKIE_PATH = '/api/users';

function refreshCookieFlags(): {
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
} {
  const raw = (process.env.COOKIE_SAME_SITE || 'lax').toLowerCase();
  const sameSite =
    raw === 'strict' || raw === 'none' || raw === 'lax'
      ? raw
      : 'lax';
  let secure =
    process.env.COOKIE_SECURE === 'true' ||
    process.env.NODE_ENV === 'production';
  if (sameSite === 'none') {
    secure = true;
  }
  return { sameSite, secure };
}

const setRefreshCookie = (res: Response, refreshToken: string) => {
  const { sameSite, secure } = refreshCookieFlags();
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: REFRESH_COOKIE_PATH,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid email or password' });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  user.refreshToken = refreshTokenHash;
  await user.save();

  setRefreshCookie(res, refreshToken);
  res.json({ token: accessToken, accessToken });
};

export const refreshUserToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is missing' });
    }

    const decoded = verifyRefreshToken(refreshToken) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!tokenMatches) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);
    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    setRefreshCookie(res, newRefreshToken);

    return res.json({ token: newAccessToken, accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];

  if (refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken) as { id: string };
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshToken = undefined;
        await user.save();
      }
    } catch (error) {
      // Intentionally ignore token verification errors during logout.
    }
  }

  const { sameSite, secure } = refreshCookieFlags();
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure,
    sameSite,
    path: REFRESH_COOKIE_PATH,
  });

  res.json({ message: 'Logged out successfully' });
};

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
