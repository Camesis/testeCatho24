import { ConnectOptions } from 'mongoose';

import Database from '../../database/Database';

export const DatabaseFactory = (): any => {
  let options: ConnectOptions = {
    dbName: process.env.DB_NAME,
    appName: process.env.APP_NAME,
    retryWrites: false,
  };

  return new Database(process.env.DB_URI!, options);
}
