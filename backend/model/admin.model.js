 import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    fullName : {type : String},
    email : {type : String},
    password : {type : String},
},{timestamps : true});

export default Admin = mongoose.model("Admin",adminSchema);