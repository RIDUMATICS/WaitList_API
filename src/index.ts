import { config } from './config';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import Logger from './config/winston';
import dbConfig from './database';
import app from './loader';

const PORT = config.PORT;

(async () => {
  try {
    const connectionOptions = await dbConfig();
    await createConnection(connectionOptions);
    app.listen(PORT, () => {
      Logger.info(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    Logger.error(`Unable to connect to db: ${err}`);
    process.exit(1);
  }
})();
