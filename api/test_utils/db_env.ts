// This file is executed once in the worker before executing each test file. We
// wait for the database connection and make sure to close it afterwards.

import { createConnection, getConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

beforeAll(async () => {
  const testOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    synchronize: true,
    dropSchema: true,
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "api_test",
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  };

  await createConnection(testOrmConfig);
});

afterAll(async () => {
  await getConnection().close();
});
