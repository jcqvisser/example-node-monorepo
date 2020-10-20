import { Router } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entity/book";
// import { getRepository } from "typeorm";

const booksRouter = Router();

booksRouter.get("/books", async (req, res) => {
  const repo = getRepository(Book);
  const books = await repo.find();
  res.json(books);
});

export { booksRouter };
