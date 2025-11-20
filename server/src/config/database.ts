import mongoose from 'mongoose';

export const connectDatabase = async (mongoUri: string) => {
  try {
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully');
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB:', error.message || error);
    if (error.message?.includes('whitelist') || error.message?.includes('IP')) {
      console.error('⚠️  Your IP address is not whitelisted in MongoDB Atlas.');
      console.error('📝 Please add your IP to MongoDB Atlas Network Access:');
      console.error('   https://cloud.mongodb.com/v2#/security/network/whitelist');
      console.error('   Or use 0.0.0.0/0 to allow all IPs (development only)');
    }
    // Don't throw - let server start but database operations will fail
    console.warn('⚠️  Server will continue but database operations will fail');
  }
};

