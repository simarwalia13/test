import mongoose from 'mongoose';

import { dbConnection } from '@/database';

export const connect = () => {
  try {
    if (mongoose.connection.readyState) return;
    mongoose.connect(dbConnection.url, { dbName: dbConnection.DatabaseName });
  } catch (error:any) {
    throw new Error('Error connecting to database',error.message);
  }
};
