const express = require('express'); 
const cors = require('cors');
const app = express(); 

const port = 3000;

app.use(cors()); 
app.use(express.json());

const foods = [
    { name: "Roti", image: {}, price : 15 , description:"Made up of wheat, good source of carbohydarate." },
    { name: "Pizza", image: {}, price : 250 , description:"Tasty cheesy pizza with oragano" },
    { name: "Burger", image: {}, price : 150 , description:"Burger with wheat bun and home made steak" },
    { name: "French Fries", image: {}, price : 80 , description:"Crispy french fries made in fresh oil, served with rosemary salt" },
];

app.get('/fooditems', (req, res) => {
   res.json(foods); 
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); 
});