import {clerkMiddleware} from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import courseRouter from './routes/courseRoutes';

dotenv.config();

const app = express();

// Set a custom Content Security Policy header
app.use((req, res, next) => {
  res.setHeader(
      'Content-Security-Policy',
      'default-src \'self\' https://vercel.live; script-src \'self\' \'unsafe-inline\' https://vercel.live; style-src \'self\' \'unsafe-inline\';');
  next();
});

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({origin: process.env.CORS_ORIGIN}));
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
