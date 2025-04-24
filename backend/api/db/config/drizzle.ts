import {config} from 'dotenv';
import {type Config} from 'drizzle-kit';

// Explicitly load .env.local
config({path: '.env.local'});

export default {
  schema: '/home/yaniv_zax/Web_Dev/forum-project/backend/api/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL ??
        'postgres://postgres:postgres@localhost:5432/postgres',
  },
  tablesFilter: ['forum_*'],
} satisfies Config;
