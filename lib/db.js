import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your DATABASE_URL to your environment variables');
}

export const sql = neon(process.env.DATABASE_URL);
