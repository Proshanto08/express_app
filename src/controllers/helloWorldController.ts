import { Request, Response } from 'express';
import { getHelloMessage } from '../services/helloWorldService';

export const getHelloWorld = (req: Request, res: Response): void => {
  const message = getHelloMessage();
  res.send(message);
};