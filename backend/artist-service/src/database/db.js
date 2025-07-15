import mongoose from "mongoose";

const db = async () => {
  const env = process.env.NODE_ENV || 'development';

  if (env !== 'production') {
      const dotenv = await import('dotenv');
      dotenv.config();
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not defined. Exiting...");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default db;
