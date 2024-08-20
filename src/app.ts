import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/corsMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import rateLimiter from './middleware/rateLimitMiddleware';
import folderRoutes from './routes/folderRoutes';
import listRoutes from './routes/listRoutes';
import contactRoutes from './routes/contactRoutes';
import timezoneRoutes from './routes/timezoneRoutes';
import brevoFolderRoutes from './brevo/folders/brevoFolderRoutes';
// import brevoListRoutes from './brevo/lists/brevoListRoutes';
// import brevoContactRoutes from './brevo/contact/brevoContactRoutes';
import brevoEventRoutes from './brevo/events/brevoEventRoutes';
import emailRoutes from './brevo/email/brevoEmailRoutes';
import eventRoutes from './routes/event.routes';

const app = express();
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(corsMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello 6sense. And app is running on port 3000');
});


app.use('/api', helloWorldRoutes);
app.use('/api', timezoneRoutes);
app.use('/api', folderRoutes);
app.use('/api', listRoutes);
app.use('/api', contactRoutes);
app.use('/api/brevo', brevoFolderRoutes);
// app.use('/api/brevo', brevoListRoutes);
// app.use('/api/brevo', brevoContactRoutes);
app.use('/api/brevo', brevoEventRoutes);
app.use('/api', emailRoutes)
app.use('/api', eventRoutes);




export default app;
