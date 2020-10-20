import * as request from "supertest";
import * as express from "express";
import { booksRouter } from "../../../src/routes/books";
import { getRepository } from "typeorm";
import { closeTypeORMConnection, createTypeORMConnection } from "../../config/typeorm";
import { Book } from "../../../src/entity/book";

describe("fdsa", () => {
  beforeAll(async () => createTypeORMConnection());
  afterAll(async () => closeTypeORMConnection());

  it("rewq", async () => {
    const app = express();

    app.use(booksRouter);

    const repo = getRepository(Book);
    const book = await repo.save({ title: "test1" });

    const result = await request(app).get("/books");
    expect(result.body).toContain(book);
    expect(result.status).toEqual(200);
  });
});
