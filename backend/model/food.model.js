import mongoose,{Schema} from "mongoose";

const foodSchema = new Schema({
  name: { type: String },
  price: { type: Number },  
  description: { type: String },
  image: { type: String },  
},{timestamps : true});

export default Food = mongoose.model("Food", foodSchema);
