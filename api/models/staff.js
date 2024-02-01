const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
  name: { type:String ,required: true },
  age: { type: Number, default: 30 },
  adress: { type:String ,required: true },
  phone: { type:String ,required: true },

});

module.exports = mongoose.model("Staff", staffSchema);
