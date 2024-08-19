import express, { Request, Response } from 'express';
import corsMiddleware from './middleware/corsMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import rateLimiter from './middleware/rateLimitMiddleware';
import folderRoutes from './routes/folderRoutes';
import listRoutes from './routes/listRoutes';
import contactRoutes from './routes/contactRoutes';
import timezoneRoutes from './routes/timezoneRoutes';
import { setupSwagger } from '../swagger';
import eventRoutes from './routes/eventRoutes';

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(corsMiddleware);

setupSwagger(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! This is a Express App. And app is running on port 5000');
});


app.use('/', helloWorldRoutes);
app.use('/api', timezoneRoutes);
app.use('/api', folderRoutes);
app.use('/api', listRoutes);
app.use('/api', contactRoutes);
app.use('/api', eventRoutes);

export default app;
