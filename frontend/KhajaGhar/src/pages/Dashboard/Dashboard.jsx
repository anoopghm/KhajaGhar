import { useState } from "react";
import FoodDetails from "../../components/FoodDetails/FoodDetails";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const updateValue = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Navbar value = {value}/>
      <div 
        className="text-4xl font-bold text-center text-red-600 mt-28 pt-20"
      >
        Unleash Your Craving
      </div>
      <FoodDetails updateValue = {updateValue} />
      <Footer />
    </div>
  );
}

export default Dashboard;
