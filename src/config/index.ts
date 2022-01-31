import * as dotenv from 'dotenv';
import * as joi from 'joi';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

// validating environment variables
const schema = joi
  .object({
    PORT: joi.number().port().default(2022),
    // database configs
    PGHOST: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().required(),
    PGDATABASE: joi.string().required(),
    PGPORT: joi.number().port().required().default(5432),
    DATABASE_LOGGING: joi.boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(false),

    // test db configs
    TESTDB_HOST: joi.string().default('localhost'),
    TESTDB_PORT: joi.number().port().default(5432),
    TESTDB_USER: joi.string().default('postgres'),
    TESTDB_PASSWORD: joi.string(),
    TESTDB_DATABASE: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  PORT: envVars.PORT,
  db: {
    port: envVars.PGPORT,
    host: envVars.PGHOST,
    username: envVars.PGUSER,
    password: envVars.PGPASSWORD,
    name: envVars.PGDATABASE,
    logging: envVars.DATABASE_LOGGING,
  },

  test: {
    port: envVars.TESTDB_PORT,
    host: envVars.TESTDB_HOST,
    username: envVars.TESTDB_USER,
    password: envVars.TESTDB_PASSWORD,
    database: envVars.TESTDB_DATABASE,
  },
};
