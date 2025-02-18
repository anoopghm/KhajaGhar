import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, decreaseItem } from "../../features/CartSlice";

const MyCart = () => {
  const Carts = useSelector(state => state.carts); // Fix: Accessing carts correctly
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = () => {
    navigate("/Details");
  };

  const incrementQuantity = (id, foodName, price) => {
    dispatch(addItem({ id, food: foodName, price }));
  };

  const decrementQuantity = (id) => {
    dispatch(decreaseItem({ id }));
  };

  // Calculate total price correctly
  const totalPrice = Carts.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Your Cart</h2>
      {Carts.length > 0 ? ( // Fix: Checking if cart has items
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-3 text-sm text-left text-gray-600">Food Item</th>
                <th className="py-2 px-3 text-sm text-left text-gray-600">Price</th>
                <th className="py-2 px-3 text-sm text-left text-gray-600">Quantity</th>
                <th className="py-2 px-3 text-sm text-left text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {Carts.map((food) => (
                <tr key={food.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm text-gray-800">{food.food}</td> 
                  <td className="py-2 px-3 text-sm text-gray-700">Rs. {food.price}</td>
                  <td className="py-2 px-3 text-sm">
                    <div className="flex items-center justify-start space-x-2">
                      <button
                        className="p-2 rounded-full text-red-600 bg-gray-200 hover:bg-red-200"
                        onClick={() => decrementQuantity(food.id)}
                      >
                        <RiSubtractFill size={18} />
                      </button>
                      <span className="text-sm text-gray-800">{food.quantity}</span>
                      <button
                        className="p-2 rounded-full text-green-600 bg-gray-200 hover:bg-green-200"
                        onClick={() => incrementQuantity(food.id, food.foodName, food.price)}
                      >
                        <IoIosAdd size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">Rs. {food.price * food.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300 text-sm"
              onClick={handleBuy}
            >
              Buy Now: Rs. {totalPrice}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4 text-sm">Your cart is empty!</div>
      )}
    </div>
  );
};

export default MyCart;
