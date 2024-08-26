// mixpanelService.ts
import Mixpanel from 'mixpanel';
import { v4 as uuidv4 } from 'uuid';

const mixpanel = Mixpanel.init('a48fd232e73f8071140ae6e6a6e16d1f');

export { mixpanel, uuidv4 };
