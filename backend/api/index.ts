import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({message: 'Test endpoint working'});
});

export default app;