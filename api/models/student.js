const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, default: 20 },
  gender: { type: String, required: true , enum : ['Male', 'Female']},
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
