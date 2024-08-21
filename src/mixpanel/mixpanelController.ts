import { Request, Response } from 'express';
import { trackEvent, createIdentity, createAlias, mergeIdentities } from './mixpanelService';

export const trackEventController = async (req: Request, res: Response): Promise<void> => {
    const { eventName, properties, ip } = req.body;

    if (!eventName || !properties) {
        res.status(400).json({ status: 400, message: 'Event name and properties are required.' });
        return;
    }

    const result = await trackEvent(eventName, properties, ip);
    res.status(result.status).json(result);
};

export const createIdentityController = async (req: Request, res: Response): Promise<void> => {
    const { identifiedId, anonId } = req.body;

    if (!identifiedId || !anonId) {
        res.status(400).json({ status: 400, message: 'Identified ID and Anon ID are required.' });
        return;
    }

    const result = await createIdentity(identifiedId, anonId);
    res.status(result.status).json(result);
};

export const createAliasController = async (req: Request, res: Response): Promise<void> => {
    const { distinctId, alias } = req.body;

    if (!distinctId || !alias) {
        res.status(400).json({ status: 400, message: 'Distinct ID and Alias are required.' });
        return;
    }

    const result = await createAlias(distinctId, alias);
    res.status(result.status).json(result);
};

export const mergeIdentitiesController = async (req: Request, res: Response): Promise<void> => {
    const { identifiedId, anonId } = req.body;

    if (!identifiedId || !anonId) {
        res.status(400).json({ status: 400, message: 'Identified ID and Anon ID are required.' });
        return;
    }

    const result = await mergeIdentities(identifiedId, anonId);
    res.status(result.status).json(result);
};
