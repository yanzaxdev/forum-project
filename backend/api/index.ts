import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import courseRouter from './routes/courseRoutes';

dotenv.config();

const app = express();

// 1. Parse JSON bodies first
app.use(express.json());

// 2. Set up CORS before other middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// 5. Routes
app.use('/api', courseRouter);

app.get('/', (req, res) => {
  res.json({message: 'Server is running'});
});

app.get('/api/test', (req, res) => {
  res.json({message: 'Hello world'});
});

// Only listen in development
if (process.env.NODE_ENV === 'development') {
  app.listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on http://localhost:3001');
  });
}

// For Vercel serverless deployment
export default app;

// Add this for Vercel
export const config = {
  api: {
    bodyParser: false,  // Disable body parsing, we'll use express
  },
};