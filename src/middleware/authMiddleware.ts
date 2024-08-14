import { Request, Response, NextFunction } from 'express';
import Key from '../models/authKeyModel';
import { config } from '../config/config';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  key: string;
}

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return; // Explicitly return to satisfy TypeScript
  }

  try {
    if (!config.jwtSecret) {
      console.error('JWT Secret is not defined');
      res.sendStatus(500); 
      return; // Explicitly return to satisfy TypeScript
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    const validKey = await Key.findOne({ key: decoded.key });

    if (!validKey) {
      res.sendStatus(401);
      return; // Explicitly return to satisfy TypeScript
    }

    next();
    return; // Explicitly return to satisfy TypeScript
  } catch (err) {
    console.error('Token verification failed:', err);
    res.sendStatus(401);
    return; // Explicitly return to satisfy TypeScript
  }
};
