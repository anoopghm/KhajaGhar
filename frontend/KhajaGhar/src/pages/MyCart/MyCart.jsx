import PropTypes from "prop-types";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCart = ({ cartItems, updateCart }) => {
  const [localCart, setLocalCart] = useState(cartItems); // Local state for cart items
  const navigate = useNavigate();
  // Update the cart in the parent component (pass the updated cart back)
  const handleQuantityChange = (name, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantities

    const updatedCart = { ...localCart, [name]: { ...localCart[name], quantity } };
    setLocalCart(updatedCart);
    updateCart(updatedCart); // Pass updated cart back to the parent component
  };

  const handleBuy = () => {
      navigate("/Details")
  }

  // Calculate total price
  const totalPrice = Object.entries(localCart).reduce(
    (total, [_, { quantity, price }]) => total + quantity * price,
    0
  );

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Your Cart</h2>
      {Object.keys(localCart).length > 0 ? (
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
              {Object.entries(localCart).map(([name, { quantity, price }], index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm text-gray-800">{name}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">Rs. {price}</td>
                  <td className="py-2 px-3 text-sm">
                    <div className="flex items-center justify-start space-x-2">
                      <button
                        className={`p-2 rounded-full ${quantity === 1 ? "text-gray-400 cursor-not-allowed" : "text-red-600 bg-gray-200 hover:bg-red-200"}`}
                        onClick={() => quantity > 1 && handleQuantityChange(name, quantity - 1)}
                        disabled={quantity === 1}
                      >
                        <RiSubtractFill size={18} />
                      </button>
                      <span className="text-sm text-gray-800">{quantity}</span>
                      <button
                        className="p-2 rounded-full text-green-600 bg-gray-200 hover:bg-green-200"
                        onClick={() => handleQuantityChange(name, quantity + 1)}
                      >
                        <IoIosAdd size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">Rs. {price * quantity}</td>
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

MyCart.propTypes = {
  cartItems: PropTypes.objectOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default MyCart;
