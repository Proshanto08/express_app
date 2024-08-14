import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  jwtSecret: string;
}

const getConfig = (): Config => {
  const { PORT, MONGO_URI, JWT_SECRET } = process.env;

  if (!PORT || !MONGO_URI || !JWT_SECRET) {
    throw new Error('Missing required environment variables');
  }

  return {
    port: parseInt(PORT, 10),
    mongoURI: MONGO_URI,
    jwtSecret: JWT_SECRET,
  };
};

export const config = getConfig();
