import { Router } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entity/book";
import * as Ajv from "ajv";

interface ApiBook {
  title: string;
}

const apiBookSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    author: { type: "string" },
  },
  required: ["title"],
};

const ajv = new Ajv();
const apiBookValidator = ajv.compile(apiBookSchema);
const validateApiBook = (
  apiBook: any,
): { valid: true; object: ApiBook } | { valid: false; errors: Ajv.ErrorObject[] } => {
  if (apiBookValidator(apiBook)) {
    return { valid: true, object: apiBook };
  } else {
    return { valid: false, errors: apiBookValidator.errors };
  }
};

const booksRouter = Router();

booksRouter.get("/books", async (req, res) => {
  const repo = getRepository(Book);
  const books = await repo.find();
  res.json(books);
});

booksRouter.post("/book", async (req, res) => {
  const result = validateApiBook(req.body);

  if (result.valid === true) {
    try {
      const repo = getRepository(Book);
      const book = await repo.save(result.object);

      res.json(book);
    } catch (e) {
      res.status(402);
    }
  } else {
    res.json(result.errors);
  }
});

booksRouter.get("/book/:id", async (req, res) => {
  const repo = getRepository(Book);
  const book = await repo.findOne(req.params.id);
  res.json(book);
});

export { booksRouter, ApiBook };
