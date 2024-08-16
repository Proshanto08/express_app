// import { Request, Response, NextFunction } from 'express';

// const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const allowedOrigin = 'http://localhost:4000';
//   const origin = req.get('Origin') || '';

//   console.log(`Origin: ${origin}`);

//   if (origin !== allowedOrigin) {
//     res.status(403).json({ error: 'Forbidden: Access is denied' });
//     return;
//   }

//   res.header('Access-Control-Allow-Origin', allowedOrigin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true');

//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//     return;
//   }

//   next();
// };

// export default corsMiddleware;
