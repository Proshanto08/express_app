// src/config/mixpanel.config.ts

import dotenv from 'dotenv';

dotenv.config();

export const mixpanelConfig = {
    projectToken: process.env.MIXPANEL_PROJECT_TOKEN || '',
    apiUrl: 'https://api.mixpanel.com/track',
};
