import { getConnectionOptions } from 'typeorm';
import { WaitList } from '../models/waitlist.model';
import { config } from '../config';

export default async () => {
  const connectionOptions = await getConnectionOptions();

  return Object.assign(connectionOptions, {
    entities: [WaitList],
    logging: config.db.logging,
  });
};
