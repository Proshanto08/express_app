import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import helloWorldRoutes from './helloWorldRoutes'; 
import { generateToken } from '../services/authService';

// Create an instance of the express application
const app = express();
app.use('/api', helloWorldRoutes);

// Mock the authToken middleware
jest.mock('../middleware/authMiddleware', () => ({
  authToken: (req: Request, res: Response, next: NextFunction): void => {
    next();
  },
}));

describe('GET /api/hello-world', () => {
  it('should return "Hello World!" for authenticated requests', async () => {
    // Generate a token
    const token = generateToken();

    // Perform the request and check the response
    const response = await request(app)
      .get('/api/hello-world')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
