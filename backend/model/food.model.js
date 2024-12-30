const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String },
  price: { type: Number },  
  image: { type: Buffer },  
  description: { type: String },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", foodSchema);
