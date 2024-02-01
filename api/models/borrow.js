const mongoose = require('mongoose')

const borrowSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  book: { type:mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, required: true},
  returnDate: { type: Date, required: true}

});

module.exports = mongoose.model("Borrow", borrowSchema);
