import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: '*',
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
    }),
  );

  app.use('/api', router);

  app.use(errorHandler);

  return app;
};

