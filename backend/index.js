require("dotenv").config();


const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString); 

const User = require("./model/user.model");
const Food = require("./model/food.model");
const  Admin  = require("./model/admin.model");

const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);
app.get("/",(req,res) => {
    res.json({data: "hello"});
});


const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
 


// create-Account 

app.post("/create-account",async (req,res) =>{
  const {fullName, email, password} = req.body;

  if(!fullName){
      return res
        .status(400)
        .json({error: true, message : "Full Name is required" });
  }

  if(!email){
      return res.status(400).json({error: true, message: "Email is required"});
  }

  if(!password){
    return res
    .status(400)
    .json({error: true, message: "Password is required"});
  }

  const isUser = await User.findOne({email : email});

  if(isUser){
      return res.json({
          error: true,
          message : "User already exist",
      });
  }

  const user = new User({
      fullName,
      email,
      password,
  });

 await user.save();

const accessToken = jwt.sign({ user}, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: "3600m",
});

return res.json({
  error:false,
  user,
  accessToken,
  message: "Registration Successful",
});

});

app.post("/login",async(req,res) => {
  const{email,password} = req.body;
  if(!email){
     return res.status(400).json({message:"Email is required"});
  }

  if(!password){
     return res.status(400).json({message:"Password is required"});
  }

  const userInfo = await User.findOne({email:email});

  if(!userInfo) {
     return res.status(400).json({message:"User not found"});
  }

  if(userInfo.email == email && userInfo.password == password){
     const user = {user: userInfo };
     const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
         expiresIn: "36000m",
     });
     return res.json({
         error:false,
         message : "Login Successful",
         email,
         accessToken,
     });
  }
  else{
     return res.status(400).json({
         error:true,
         message: "Invalid Credentials",
     });
  }
 });

 // Get User
app.get("/get-users",authenticateToken,async(req,res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if(!isUser){
      return res.sendStatus(401);
  }

  return res.json({
      user:{
          fullName: isUser.fullName,
           email : isUser.email, 
          _id : isUser._id,
           createdOn:isUser.createdOn
          },
      message: "",
  });
});

//Adding Foods
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve the uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/addfoods", upload.single("image"), async (req, res) => {
  const {name, price, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Use public URL
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!price) {
    return res.status(400).json({ message: "Price is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  if (!imagePath) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const food = new Food({
      name,
      price,
      description,
      image: `http://localhost:3000${imagePath}`, // Full URL for the image
    });

    await food.save();

    res.status(201).json({
      message: "Food item successfully added",
      food,
    });
  } catch (error) {
    console.error("Error saving food item:", error);
    res.status(500).json({ message: "Error saving food item", error });
  }
});

//Edit foods
app.patch("/fooditems/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Use image if provided

  if (!name && !price && !description && !imagePath) {
    return res.status(400).json({ message: "At least one field must be provided." });
  }

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found." });
    }

    // Update only the provided fields
    if (name) food.name = name;
    if (price) food.price = price;
    if (description) food.description = description;
    if (imagePath) food.image = `http://localhost:3000${imagePath}`;

    await food.save();
    res.status(200).json({ message: "Food item updated successfully", food });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ message: "Error updating food item", error });
  }
});

//Get food

app.get("/fooditems", async (req, res) => {
  try {
    const foods = await Food.find();
    const formattedFoods = foods.map((food) => ({
      id: food._id,
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image,
      createdOn: food.createdOn,
    }));
    res.json(formattedFoods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
});


//Add new admin 
app.post("/create-admin",async (req,res) =>{
  const {fullName, email, password} = req.body;

  if(!fullName){
      return res
        .status(400)
        .json({error: true, message : "Full Name is required" });
  }

  if(!email){
      return res.status(400).json({error: true, message: "Email is required"});
  }

  if(!password){
    return res
    .status(400)
    .json({error: true, message: "Password is required"});
  }

  const isAdmin = await Admin.findOne({email : email});

  if(isAdmin){
      return res.json({
          error: true,
          message : "Admin already exist",
      });
  }

  const admin = new Admin({
      fullName,
      email,
      password,
  });

 await admin.save();

const accessToken = jwt.sign({admin}, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: "3600m",
});

return res.json({
  error:false,
  admin,
  accessToken,
  message: "Registration Successful",
});
});


// Admin login 
app.post("/adminlogin",async(req,res) => {
  const{email,password} = req.body;
  if(!email){
     return res.status(400).json({message:"Email is required"});
  }

  if(!password){
     return res.status(400).json({message:"Password is required"});
  }

  const AdminInfo = await Admin.findOne({email:email});

  if(!AdminInfo) {
     return res.status(400).json({message:"Admin not found. Please ask a admin to add !"});
  }

  if(AdminInfo.email == email && AdminInfo.password == password){
     const admin = {admin: AdminInfo };
     const accessToken = jwt.sign(admin,process.env.ACCESS_TOKEN_SECRET,{
         expiresIn: "36000m",
     });
     return res.json({
         error:false,
         message : "Login Successful",
         email,
         accessToken,
     });
  }
  else{
     return res.status(400).json({
         error:true,
         message: "Invalid Credentials",
     });
  }
 });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); 
});