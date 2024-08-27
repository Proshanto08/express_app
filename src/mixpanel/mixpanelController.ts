import { Request, Response } from 'express';
import { updateUserProfile, trackUserEvent, createAlias } from './mixpanelService';
import { v4 as uuidv4 } from 'uuid';

export const handleTrackEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventName, properties } = req.body;
  const email = properties.email;
  let distinctId = email || req.cookies.distinctId || uuidv4();

  if (!eventName) {
    res.status(400).json({ error: 'Event name is required' });
    return;
  }

  try {
    if (email) {
      const previousDistinctId = req.cookies.distinctId;

      await updateUserProfile(distinctId, properties);

      if (previousDistinctId) {
        await createAlias(previousDistinctId, distinctId);
        // await mergeIdentities(previousDistinctId, email);
      }
      
    } 

    await trackUserEvent(distinctId, eventName, properties);
    res.cookie('distinctId', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).json({ error: 'Error processing event' });
  }
};

export const handleClearDistinctId = (req: Request, res: Response): void => {
  res.cookie('distinctId', '', { maxAge: 0, httpOnly: true });
  res.status(200).json({ message: 'Distinct ID cookie cleared successfully' });
};
