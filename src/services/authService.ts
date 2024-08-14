import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import AuthKey from '../models/authKeyModel';

export const generateToken = () => {
  const Key = 'express'; 
  return jwt.sign({ key: Key }, config.jwtSecret!, { expiresIn: '1h' });
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as { key: string };

    await AuthKey.findOne({ key: decoded.key });

    return decoded; 
  } catch (err) {
    console.error('Error verifying token:', err);
    return null;
  }
};
