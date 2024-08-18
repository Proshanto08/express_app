import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token verification failed' });
  }
};
