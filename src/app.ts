import express, { Request, Response } from 'express';
import corsMiddleware from './middleware/corsMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
// import axios from 'axios';
import rateLimiter from './middleware/rateLimitMiddleware';
import folderRoutes from './routes/folderRoutes';

const app = express();
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! This is a Express App.');
});


// For checking cors middleware

// app.get('/', async (req: Request, res: Response) => {
//   try {
//     const response = await axios.get('http://localhost:4000');
//     res.send(response.data);
//   } catch (error) {
//     res.status(500).send('Error occurred while fetching data.');
//   }
// });

app.use('/api', helloWorldRoutes);
app.use('/api', folderRoutes);

export default app;
