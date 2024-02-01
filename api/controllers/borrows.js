const Borrow = require("../models/borrow");

const createBorrow = async(req, res,next) => {
    try {
        const borrow = new Borrow({
          student: req.body.student,
          book: req.body.book,
          borrowDate: req.body.borrowDate,
          returnDate: req.body.returnDate,
        });
        const result = await borrow.save();
        console.log(result);
        res.status(201).json({
          message: "Borrow Record Created successfully",
          result: result
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getAllBorrow = async(req,res,next) => {
    try {
        const docs = await Borrow.find()
          .populate("student book")
          //.populate('book')
          .select("student book borrowDate returnDate");
        // const response = {
        //   count: docs.length,
        //   borrows: docs.map((doc) => ({
        //     student: doc.student,
        //     book: doc.book,
        //     borrowDate: doc.borrowDate,
        //     returnDate: doc.returnDate,
        //   })),
        // };
    
        //   if (docs.length >= 0) {
        res.status(200).json({
          count: docs.length,
          borrows: docs,
        });
       
    
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getBorrowById = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const doc = await Borrow.findById(id)
          .populate("student book ") // Populate the 'student' field with actual student data
          .select("student book borrowDate returnDat")
          .exec();
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            borrow: doc,
          });
        } else {
          res.status(404).json({ message: "Borrow record not found" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: message.err });
      }
};

const updateBorrowById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Borrow.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              student: req.body.student,
              book: req.body.book,
              borrowDate: req.body.borrowDate,
              returnDate: req.body.returnDate,
            },
          },{new: true}
        ).exec();
        console.log(result);
        res.status(200).json({
          message: "Borrow Record Updated",
          borrows: result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const deleteBorrowById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Borrow.deleteOne({ _id: id }).exec();
        console.log(result);
        res.status(200).json({
          message: "Borrow record deleted successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getBorrowByStudentId = async(req, res, next) => {
    try {
        const id = req.params.id;
        const docs = await Borrow.find({ student: id })
          .populate("student") // Populate the 'student' field with actual student data
          .populate("book") // Populate the 'book' field with actual book data
          .select("student book borrowDate returnDate")
          .exec();
    
        console.log("From database", docs);
        if (docs && docs.length > 0) {
          res.status(200).json({
            borrows: docs,
          });
        } else {
          res
            .status(404)
            .json({ message: "No borrow records found for the student" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
};

const getBorrowByBookId = async(req, res, next) => {
    try {
        const id = req.params.id;
        const docs = await Borrow.find({ book: id })
          .populate("student") // Populate the 'student' field with actual student data
          .populate("book") // Populate the 'book' field with actual book data
          .select("student book borrowDate returnDate")
          .exec();
    
        console.log("From database", docs);
        if (docs && docs.length > 0) {
          res.status(200).json({
            borrows: docs,
          });
        } else {
          res.status(404).json({ message: "No borrow records found for the book" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: message.err });
      }
};

module.exports={
    createBorrow,
    getAllBorrow,
    getBorrowById,
    updateBorrowById,
    deleteBorrowById,
    getBorrowByStudentId,
    getBorrowByBookId,
};
