import * as express from "express";
import * as request from "supertest";
import { getRepository } from "typeorm";
import { Book } from "../../entity/book";
import { booksRouter } from "../books/books";

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const app = express();
    app.use(booksRouter);

    const repo = getRepository(Book);

    const book = new Book();
    book.title = "book1";

    await repo.save(book);

    const response = await request(app).get("/books");

    expect(response.text).toEqual("{}");
  });
});
