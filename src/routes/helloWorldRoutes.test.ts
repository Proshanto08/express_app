import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import helloWorldRoutes from './helloWorldRoutes'; 
import { generateToken } from '../services/authService';

const app = express();
app.use('/api', helloWorldRoutes);


jest.mock('../middleware/authMiddleware', () => ({
  authToken: (req: Request, res: Response, next: NextFunction) => next(),
}));

describe('GET /api/hello-world', () => {
  it('should return "Hello World!" for authenticated requests', async () => {

    const token = generateToken();

    const response = await request(app)
      .get('/api/hello-world')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
