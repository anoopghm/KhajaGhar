import { useState, useEffect } from "react";
import axios from "axios";
import roti from "../../assets/roti.png";
import pizza from "../../assets/pizza.png";
import burger from "../../assets/burger.png";
import FrenchFries from "../../assets/FrenchFries.png";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import PropTypes from "prop-types";

const FoodDetails = ({ updateValue, passToCart }) => {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Fetch food items from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/fooditems")
      .then((response) => {
        setFoods(response.data);
        // Initialize quantities for all items to 0
        const initialQuantities = response.data.reduce((acc, food, index) => {
          acc[index] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Function to get food image based on the index
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
        return null;
    }
  };

  // Memoized function for updating cart items
  const updateCartItems = (newQuantities) => {
    return foods.reduce((acc, food, idx) => {
      if (newQuantities[idx] > 0) {
        acc[food.name] = newQuantities[idx];
      }
      return acc;
    }, {});
  };

  const incrementQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [index]: prevQuantities[index] + 1,
      };

      const cartItems = updateCartItems(newQuantities);
      const totalQuantity = Object.values(newQuantities).reduce(
        (total, qty) => total + qty,
        0
      );

      updateValue(totalQuantity); // Pass the total quantity to the parent
      passToCart(cartItems); // Pass the selected food items with names as keys
      return newQuantities;
    });
  };

  const decrementQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [index]: Math.max(0, prevQuantities[index] - 1),
      };

      const cartItems = updateCartItems(newQuantities);
      const totalQuantity = Object.values(newQuantities).reduce(
        (total, qty) => total + qty,
        0
      );

      updateValue(totalQuantity); // Pass the total quantity to the parent
      passToCart(cartItems); // Pass the selected food items with names as keys
      return newQuantities;
    });
  };

  return (
    <div className="m-10">
      {foods.length > 0 ? (
        foods.map((food, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 mb-4 shadow-lg rounded-lg"
          >
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
              <div className="flex items-center mt-2">
                <button
                  className="flex items-center text-red-600 p-2"
                  onClick={() => decrementQuantity(index)}
                >
                  <RiSubtractFill />
                </button>
                <div className="text-lg font-bold mx-4">{quantities[index]}</div>
                <button
                  className="flex items-center text-green-600 p-2"
                  onClick={() => incrementQuantity(index)}
                >
                  <IoIosAdd />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

FoodDetails.propTypes = {
  updateValue: PropTypes.func.isRequired, 
  passToCart: PropTypes.func.isRequired, 
};

export default FoodDetails;
