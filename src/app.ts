import express, { Request, Response } from 'express';
import corsMiddleware from './middleware/corsMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import rateLimiter from './middleware/rateLimitMiddleware';
import folderRoutes from './routes/folderRoutes';
import listRoutes from './routes/listRoutes';
import contactRoutes from './routes/contactRoutes';
import timezoneRoutes from './routes/timezoneRoutes';
import brevoFolderRoutes from './brevo/folders/brevoFolderRoutes';

const app = express();
app.use(rateLimiter);
app.use(express.json());

app.use(corsMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! This is a Express App. And app is running on port 3000');
});


app.use('/api', helloWorldRoutes);
app.use('/api', timezoneRoutes);
app.use('/api', folderRoutes);
app.use('/api', listRoutes);
app.use('/api', contactRoutes);
app.use('/api/brevo', brevoFolderRoutes);


export default app;
