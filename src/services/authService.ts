import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import AuthKey from '../models/authKeyModel';

interface IJwtPayload {
  key: string;
}


const checkJwtSecret = (): void => {
  if (!config.jwtSecret) {
    throw new Error('JWT Secret is not defined');
  }
};

export const generateToken = (): string => {
  checkJwtSecret();
  const key = 'express';
  return jwt.sign({ key }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = async (token: string): Promise<IJwtPayload | null> => {
  try {
    checkJwtSecret();
    const decoded = jwt.verify(token, config.jwtSecret) as IJwtPayload;
    const validKey = await AuthKey.findOne({ key: decoded.key });
    return validKey ? decoded : null;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
};
