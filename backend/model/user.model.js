import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    fullName : {type : String},
    email : {type : String},
    password : {type : String},
},{timestamps : true});

export default User = mongoose.model("User",userSchema);