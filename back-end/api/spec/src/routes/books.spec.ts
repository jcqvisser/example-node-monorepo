import * as request from "supertest";
import * as express from "express";
import { ApiBook, booksRouter } from "../../../src/routes/books";
import { getRepository } from "typeorm";
import { closeTypeORMConnection, createTypeORMConnection } from "../../config/typeorm";
import { Book } from "../../../src/entity/book";
import bodyParser = require("body-parser");

describe("booksRouter", () => {
  beforeAll(async () => createTypeORMConnection());
  afterAll(async () => closeTypeORMConnection());

  it("gets existing books", async () => {
    const app = express();

    app.use(booksRouter);

    const repo = getRepository(Book);
    const book = await repo.save({ title: "test1" });

    const result = await request(app).get("/books");
    expect(result.body).toContain(book);
    expect(result.status).toEqual(200);
  });

  it("creates a book", async () => {
    const app = express();
    app.use(express.json());
    app.use(booksRouter);

    const repo = getRepository(Book);
    const title = "Don Quixote";
    const bookData: ApiBook = { title };

    const initialCount = await repo.count({ where: { title } });

    const result = await request(app).post("/book").type("json").send(bookData);
    expect(result.status).toEqual(200);

    const finalCount = await repo.count({ where: { title } });

    expect(finalCount).toEqual(initialCount + 1);
  });

  it("validates the request body", async () => {
    const app = express();
    app.use(express.json());
    app.use(booksRouter);

    const bookData = { title: "The Way of Kings", rating: "5/7" };

    const result = await request(app).post("/book").type("json").send(bookData);
    expect(result.status).not.toEqual(200);
  });

  it("finds a book", async () => {
    const app = express();
    app.use(booksRouter);

    const repo = getRepository(Book);
    const title = "Gardens of the Moon";
    const book = await repo.save({ title });

    const result = await request(app).get(`/book/${book.id}`);
    expect(result.status).toEqual(200);
    expect(result.body.title).toEqual(title);
  });
});
