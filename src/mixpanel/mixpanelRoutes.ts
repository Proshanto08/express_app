import { Router } from 'express';
import { trackEventController, createIdentityController, createAliasController, mergeIdentitiesController } from './mixpanelController';

const router = Router();

router.post('/track-event', trackEventController);
router.post('/create-identity', createIdentityController);
router.post('/create-alias', createAliasController);
router.post('/merge-identities', mergeIdentitiesController);

export default router;
