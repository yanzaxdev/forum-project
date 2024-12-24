import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS for development only
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:3000'  // Your Next.js dev server
  }));
}

app.get('/api/test', (req, res) => {
  res.json({message: 'Hello'});
});

export default app;