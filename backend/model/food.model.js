const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String },
  price: { type: Number },  
  description: { type: String },
  image: { type: String },  
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", foodSchema);
