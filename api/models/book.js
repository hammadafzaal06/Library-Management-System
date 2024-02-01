const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  auther: { type: String, required: true },
  availableCopies: {type: Number, required: true, default: 200},
  totalCopies: { type: Number, required: true ,default: 400},

});

module.exports = mongoose.model("Book", bookSchema);
