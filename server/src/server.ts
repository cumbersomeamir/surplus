import http from 'http';

import { createApp } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

const bootstrap = async () => {
  await connectDatabase(env.mongoUri);

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Unable to start the server', error);
  process.exit(1);
});

