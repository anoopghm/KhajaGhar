import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addItem, decreaseItem } from "../../features/CartSlice";

const FoodDetails = () => {
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/fooditems")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const incrementQuantity = (id, food, price) => {
    dispatch(addItem({ id, food, price }));
  };

  const decrementQuantity = (id, food, price) => {
    dispatch(decreaseItem({ id, food, price }));
  };

  return (
    <div className="m-10">
      {foods.length > 0 ? (
        foods.map((food) => (
          <div
            key={food._id} // Using MongoDB ID
            className="flex items-center bg-white p-4 mb-4 shadow-lg rounded-lg"
          >
            <div className="flex flex-col items-center mr-6">
              <img
                src={food.image}
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
                  onClick={() => decrementQuantity(food._id, food.name, food.price)}
                >
                  <RiSubtractFill />
                </button>
                <div className="text-lg font-bold mx-4">{/* Show quantity from Redux state */}</div>
                <button
                  className="flex items-center text-green-600 p-2"
                  onClick={() => incrementQuantity(food._id, food.name, food.price)}
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

export default FoodDetails;
