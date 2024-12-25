import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {courses, db} from '~/db';

import courseRouter from './routes/courseRoutes';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({origin: process.env.CORS_ORIGIN}));

// Routes
app.use('/api', courseRouter);  // This will prefix all routes with /api

app.get('/test-courses', async (req, res) => {
  try {
    const allCourses = await db.select().from(courses);
    res.json(allCourses);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch courses'});
  }
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