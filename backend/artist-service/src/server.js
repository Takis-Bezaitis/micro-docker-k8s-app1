import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/db.js';
import artistsRouter from './routes/artistsRoutes.js';

const app = express();
dotenv.config();
db();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/artists', artistsRouter)

app.listen(PORT, () => {
    console.log(`Artist service is running on port: ${PORT}`);
});

