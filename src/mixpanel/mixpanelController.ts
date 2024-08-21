import { Request, Response } from 'express';
import { trackEvent } from './mixpanelService';
import { v4 as uuidv4 } from 'uuid';

export const trackEventController = async (req: Request, res: Response): Promise<void> => {
    const { eventName, properties } = req.body;

    if (!eventName || !properties) {
        res.status(400).json({ status: 400, message: 'Event name and properties are required.' });
        return;
    }

    let distinctId = req.cookies.distinctId;
    if (!distinctId) {
        distinctId = uuidv4();
        res.cookie('distinctId', distinctId, { httpOnly: true, maxAge: 86400000 }); // 1 day
    }

    properties.distinct_id = distinctId;
    const result = await trackEvent(eventName, properties);
    res.status(result.status).json(result);
};



import { createIdentity } from './mixpanelService';

export const createIdentityController = async (req: Request, res: Response): Promise<void> => {
    const { distinctId, userProperties } = req.body;

    if (!distinctId || !userProperties) {
        res.status(400).json({ status: 400, message: 'Distinct ID and user properties are required.' });
        return;
    }

    const result = await createIdentity(distinctId, userProperties);
    res.status(result.status).json(result);
};



import { createAlias } from './mixpanelService';

export const createAliasController = async (req: Request, res: Response): Promise<void> => {
    const { distinctId, alias } = req.body;

    if (!distinctId || !alias) {
        res.status(400).json({ status: 400, message: 'Distinct ID and alias are required.' });
        return;
    }

    const result = await createAlias(distinctId, alias);
    res.status(result.status).json(result);
};



import { mergeIdentities } from './mixpanelService';

export const mergeIdentitiesController = async (req: Request, res: Response): Promise<void> => {
    const { identities } = req.body;

    if (!identities || !Array.isArray(identities)) {
        res.status(400).json({ status: 400, message: 'Identities are required and should be an array.' });
        return;
    }

    const result = await mergeIdentities(identities);
    res.status(result.status).json(result);
};
