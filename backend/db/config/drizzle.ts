import {config} from 'dotenv';
import {type Config} from 'drizzle-kit';

// Explicitly load .env.local
config({path: '.env.local'});

export default {
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ??
        'postgres://postgres:postgres@localhost:5432/postgres',
  },
  tablesFilter: ['forum_*'],
} satisfies Config;
