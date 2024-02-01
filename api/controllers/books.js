const Book = require("../models/book");

const createBook = async (req, res, next) => {
  try {
    const book = new Book({
      title: req.body.title,
      auther: req.body.auther,
      availableCopies: req.body.availableCopies,
      totalCopies: req.body.totalCopies,
    });
    const result = await book.save();
    console.log(result);
    res.status(201).json({
      message: "Book Created successfully",
      book: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: message.err,
    });
  }
};

const getAllBooks = async(req, res, next) => {
    try {
        const docs = await Book.find().select(
          "title auther availableCopies totalCopies "
        );
        // .exec()
        // const response = {
        //   count: docs.length,
        //   books: docs.map((doc) => ({
        //       title: doc.title,
        //       auther: doc.auther,
        //       availableCopies: doc.availableCopies,
        //       totalCopies: doc.totalCopies,
    
        //   })),
        // }
    
        //   if (docs.length >= 0) {
        res.status(200).json({
          count: docs.length,
          books: docs,
        });
        //  } else {
        //  res.status(404).json({
        //      message: "No entries found",
        //    });
        //  }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getBookById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Book.findById(id)
          .select("title auther availableCopies totalCopies")
          .exec();
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            book: doc,
          });
        } else {
          res.status(404).json({ message: "Book not found" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: message.err });
      }
};

const updateBookById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Book.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              title: req.body.title,
              auther: req.body.auther,
              availableCopies: req.body.availableCopies,
              totalCopies: req.body.totalCopies,
            },
          },{new: true}
        )
        .exec();
        console.log(result);
        res.status(200).json({
          message: "Book Updated",
          books: result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const deleteBookById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Book.deleteOne({ _id: id }).exec();
        console.log(result);
        res.status(200).json({
          message: "Book deleted successfully",
          books: result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};





module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
