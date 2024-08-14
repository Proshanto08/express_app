import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import AuthKey from '../models/authKeyModel';

export const generateToken = (): string => {
  const Key = 'express';
  if (!config.jwtSecret) {
    throw new Error('JWT Secret is not defined');
  }
  return jwt.sign({ key: Key }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = async (token: string): Promise<{ key: string } | null> => {
  try {
    if (!config.jwtSecret) {
      throw new Error('JWT Secret is not defined');
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { key: string };

    const validKey = await AuthKey.findOne({ key: decoded.key });

    if (!validKey) {
      return null;
    }

    return decoded;
  } catch (err) {
    console.error('Error verifying token:', err);
    return null;
  }
};
