const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const path = require('path');

const Borrow = require("../models/borrow");
const { createBorrow, getAllBorrow, getBorrowById, updateBorrowById, deleteBorrowById, getBorrowByStudentId, getBorrowByBookId } = require("../controllers/borrows");
const { getBookById } = require("../controllers/books");

router.get("/borrows",getAllBorrow);

router.post("/borrows", createBorrow);

router.get("/borrows/:id", getBorrowById);

router.patch("/borrows/:id", updateBorrowById);

router.delete("/borrows/:id", deleteBorrowById);

router.get("/borrows/student/:id", getBorrowByStudentId);

router.get("/borrows/book/:id", getBorrowByBookId);

module.exports = router;








// remove multiple populate
// return new document in all creation requests
// return updated document in updation requests
// remove all maps