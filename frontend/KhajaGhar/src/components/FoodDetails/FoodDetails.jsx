import { useState, useEffect } from "react";
import axios from "axios";
import roti from '../../assets/roti.png';
import pizza from '../../assets/pizza.png';
import burger from '../../assets/burger.png';
import FrenchFries from '../../assets/FrenchFries.png';

const FoodDetails = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fooditems")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const getFoodImage = (index) => {
    switch (index) {
      case 0:
        return roti;
      case 1:
        return pizza;
      case 2:
        return burger;
      case 3:
        return FrenchFries;
      default:
        return null; // Default image if no match
    }
  };

  return (
    <div className="m-10">
      {foods.length > 0 ? (
        foods.map((food, index) => (
          <div key={index} className="flex items-center bg-white p-4 mb-4 shadow-lg rounded-lg">
            <div className="flex flex-col items-center mr-6">
              <img
                src={getFoodImage(index)} // Dynamically change image based on the index
                alt={food.name}
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
              <div className="text-lg font-bold text-red-600">Rs. {food.price}</div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-xl font-semibold text-gray-800">{food.name}</div>
              <div className="text-sm text-gray-500 italic">{food.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default FoodDetails;
