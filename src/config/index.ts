import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  DB_DATABASE,
  DB_HOST,
  HOSTNAME,
  NEXTAUTH_SECRET,
  DB_NAME,
  EXPIRE_DAY,

  JWT_SECRET,
  GMAIL_USER,
  GMAIL_PASS,
} = process.env;
