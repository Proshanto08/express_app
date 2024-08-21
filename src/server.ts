import { connectDB } from './database/mongoDB';
import app from './app';
import { config } from './config/config';
import { generateToken } from './services/authService';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const token = await generateToken();
    console.log('Generated Token:', token);

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
