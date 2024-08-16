import express, { Request, Response } from 'express';
// import corsMiddleware from './middleware/corsMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import axios from 'axios';
import rateLimiter from './middleware/rateLimitMiddleware';
import folderRoutes from './routes/folderRoutes';
import listRoutes from './routes/listRoutes';
import contactRoutes from './routes/contactRoutes';
import timezoneRoutes from './routes/timezoneRoutes';
import { setupSwagger } from '../swagger';

const app = express();
// app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());

setupSwagger(app);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello! This is a Express App.');
// });



app.get('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://localhost:3000', {
      headers: {
        'Origin': 'http://localhost:5000'
      }
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error occurred while fetching data.');
  }
});

app.use('/', helloWorldRoutes);
app.use('/api', timezoneRoutes);
app.use('/api', folderRoutes);
app.use('/api', listRoutes);
app.use('/api', contactRoutes);

export default app;
