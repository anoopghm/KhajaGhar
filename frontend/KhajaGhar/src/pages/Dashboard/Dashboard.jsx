import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FoodDetails from "../../components/FoodDetails/FoodDetails";

const Dashboard = () => {
  const [value, setValue] = useState(0); // Track total quantity
  const [selectedItems, setSelectedItems] = useState({}); // Track selected food items

  const updateValue = (newValue) => setValue(newValue);
  const passToCart = (updatedItems) => setSelectedItems(updatedItems);

  return (
    <div>
      <Navbar value={value} cartItems={selectedItems} />
      <div className="text-4xl font-bold text-center text-red-600 mt-28 pt-20">
        Unleash Your Craving
      </div>
      <FoodDetails updateValue={updateValue} passToCart={passToCart} />
      <Footer />
    </div>
  );
};



export default Dashboard;
