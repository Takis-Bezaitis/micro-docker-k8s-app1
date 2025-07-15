import express from 'express';
import cors from 'cors';
import albumDB from './database/albumDB.js';
import albumRouter from './routes/albumsRoutes.js';

const env = process.env.NODE_ENV || 'development';

(async () => {
  // Load .env only in development
  if (env !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
  }

  // Now you can safely access process.env
  const app = express();
  const PORT = process.env.PORT || 5002;

  await albumDB(); // connect to MongoDB

  app.use(cors());
  app.use(express.json());
  app.use("/api/albums", albumRouter);

  app.listen(PORT, () => {
    console.log(`🎵 The album service is running on port: ${PORT}`);
  });
})();
