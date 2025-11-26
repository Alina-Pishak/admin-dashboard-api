import { Request, Response } from 'express';
import { User } from '../models/User';
import { IUser } from '../types/user';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid email or password' });

  const token = generateToken(user.id);
  res.json({ token });
};

export const logoutUser = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

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
