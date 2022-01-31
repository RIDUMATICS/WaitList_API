import * as path from 'path';
import faker from 'faker';
import { Connection, createConnection } from 'typeorm';
import { Type, WaitLister } from '../src/interface';
import { config } from '../src/config';

export class TestHelper {
  private dbConnect!: Connection;

  private static _instance: TestHelper;

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  async setupTestDB() {
    this.dbConnect = await createConnection({
      type: 'postgres',
      host: config.test.host,
      port: config.test.port,
      username: config.test.username,
      password: config.test.password,
      database: config.test.database,
      dropSchema: true,
      migrationsRun: true,
      synchronize: true,
      entities: [path.join(__dirname, '..', '**', '*.model.{js,ts}')],
    });
  }

  async closeTestDB() {
    this.dbConnect.close();
  }

  async clearTestDB() {
    const entities = this.dbConnect.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = this.dbConnect.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }

  generateUserData(override = {}): WaitLister {
    return {
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      description: faker.lorem.sentence(),
      type: Type['Investors'],
      ...override,
    };
  }
}
