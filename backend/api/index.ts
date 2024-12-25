import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {courses, db} from '~/db';

import courseRouter from './routes/courseRoutes';

dotenv.config();

const app = express();

// Enable CORS for all routes
// app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(cors())

// Routes
app.use('/api', courseRouter);  // This will prefix all routes with /api


// Add this before your other routes
app.get('/', (req, res) => {
  res.json({message: 'Server is running'});
});



app.get('/api/test', (req, res) => {
  res.json({message: 'Hello'});
});

// Remove the app.listen() for Vercel deployment
// Only keep this during local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
  });
}

export default app;