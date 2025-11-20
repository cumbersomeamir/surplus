import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV ?? 'staging'}`;
dotenv.config({ path: envFile });

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'staging',
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/surplus',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me',
};

