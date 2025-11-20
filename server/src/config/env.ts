import dotenv from 'dotenv';

// Try to load environment-specific file first, then fallback to .env
const nodeEnv = process.env.NODE_ENV ?? 'staging';
const envFile = `.env.${nodeEnv}`;
dotenv.config({ path: envFile });
// Fallback to .env if environment-specific file doesn't exist
dotenv.config({ path: '.env' });

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'staging',
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/surplus',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me',
};

