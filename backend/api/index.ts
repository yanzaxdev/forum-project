import {clerkMiddleware} from '@clerk/express';
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

// 3. Set CSP after CORS but before routes
app.use((req, res, next) => {
  res.setHeader(
      'Content-Security-Policy',
      'default-src \'self\' https://vercel.live; ' +
          'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://vercel.live; ' +
          'style-src \'self\' \'unsafe-inline\'; ' +
          'connect-src \'self\' https://vercel.live https://*.clerk.accounts.dev; ' +
          'frame-src \'self\' https://vercel.live https://*.clerk.accounts.dev;');
  next();
});

// 4. Authentication middleware
app.use(clerkMiddleware());

// 5. Routes
app.use('/api', courseRouter);

app.get('/', (req, res) => {
  res.json({message: 'Server is running'});
});

app.get('/api/test', (req, res) => {
  res.json({message: 'Hello world'});
});

if (process.env.CORS_ORIGIN === 'http://localhost:3000') {
  app.listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on http://localhost:3001');
  });
}

export default app;