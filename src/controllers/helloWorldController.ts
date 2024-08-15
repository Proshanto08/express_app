import { Request, Response } from 'express';
import { getHelloMessage } from '../services/helloWorldService';
import { getAllTimezones } from '../timezones';

export const getHelloWorld = (req: Request, res: Response): void => {
  const message = getHelloMessage();
  res.send(message);
};


export const getTimezonesController = (req: Request, res: Response): void => {
  try {
    const timezones = getAllTimezones();
    res.status(200).json(timezones);
  } catch (err) {
    console.error('Error fetching timezones:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
