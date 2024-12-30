import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import PropTypes from "prop-types";

const FoodDetails = ({ updateValue, passToCart }) => {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/fooditems")
      .then((response) => {
        setFoods(response.data);

        const initialQuantities = response.data.reduce((acc, food, index) => {
          acc[index] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

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

      updateValue(totalQuantity);
      passToCart(cartItems);
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

      updateValue(totalQuantity);
      passToCart(cartItems);
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
                src={food.image} // Correctly set the image URL
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
