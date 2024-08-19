// src/utils/event.utils.ts

export const getEventProperties = (req: any): Record<string, any> => {
    return {
        distinct_id: req.ip,
        url: req.originalUrl,
        method: req.method,
        user_agent: req.headers['user-agent'],
    };
};
