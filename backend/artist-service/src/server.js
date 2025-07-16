import express from 'express';
import cors from 'cors';
import artistsRouter from './routes/artistsRoutes.js';
import db from './database/db.js';

const env = process.env.NODE_ENV || 'development';

(async () => {
  // Load .env only in development
  if (env !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
  }

  // Now you can safely access process.env
  const app = express();
  const PORT = process.env.PORT || 5001;

  await db(); // connect to MongoDB

  app.use(cors());
  app.use(express.json());
  app.use("/api/artists", artistsRouter);

  app.listen(PORT, () => {
    console.log(`🎵 Artist service is running on port: ${PORT}`);
  });
})();

// Updated comment to trigger CI/CD pipeline