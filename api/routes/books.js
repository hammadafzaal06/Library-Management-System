const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require("../controllers/books");

router.get("/books", getAllBooks);

router.post("/books", createBook);

router.get("/books/:id", getBookById);

router.patch("/books/:id", updateBookById);

router.delete("/books/:id", deleteBookById);

module.exports = router;
