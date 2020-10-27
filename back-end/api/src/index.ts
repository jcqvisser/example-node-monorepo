import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { rootRouter } from "./routes/root";
import { booksRouter } from "./routes/books";

const PORT = 3000;

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(express.json());

    app.use(rootRouter);
    app.use(booksRouter);

    app.listen(PORT, () => console.log(`Express started on port ${PORT}`));
  })
  .catch((error) => console.log(error));
