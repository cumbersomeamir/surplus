import http from 'http';

import { createApp } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

const bootstrap = async () => {
  // Try to connect to database, but don't crash if it fails
  try {
    await connectDatabase(env.mongoUri);
  } catch (error) {
    console.warn('⚠️  Database connection failed, but server will continue');
  }

  const app = createApp();
  const server = http.createServer(app);

  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${env.port} is already in use. Please free the port or change PORT in .env`);
      console.error('💡 To free the port, run: lsof -ti:4000 | xargs kill -9');
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
      process.exit(1);
    }
  });

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ API listening on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Unable to start the server', error);
  process.exit(1);
});

