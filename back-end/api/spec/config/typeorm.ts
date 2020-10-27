import { createConnection, getConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export async function createTypeORMConnection() {
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
    entities: ["build/api/src/entity/**/*.js"],
    migrations: ["build/api/src/migration/**/*.js"],
    subscribers: ["build/api/src/subscriber/**/*.js"],
  };

  await createConnection(testOrmConfig);
}

export async function closeTypeORMConnection() {
  await getConnection().close();
}
