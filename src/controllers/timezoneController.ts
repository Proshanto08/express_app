import { Request, Response } from 'express';
import { getAllTimezones } from '../services/timezoneService';

export const getTimezonesController = (req: Request, res: Response): void => {
  try {
    const timezones = getAllTimezones();
    res.status(200).json(timezones);
  } catch (err) {
    console.error('Error fetching timezones:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
