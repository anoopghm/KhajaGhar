import { useState } from "react";

// Sample cart items (can be fetched from an API or passed as props)
const initialCartItems = [
  { id: 1, name: "Roti", price: 20, quantity: 1 },
  { id: 2, name: "Pizza", price: 150, quantity: 2 },
  { id: 3, name: "Burger", price: 100, quantity: 1 },
];

const MyCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to handle incrementing quantity
  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to handle decrementing quantity
  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-50 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">Rs. {item.price}</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="text-lg text-gray-600"
                >
                  -
                </button>
                <div className="text-lg">{item.quantity}</div>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="text-lg text-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-between font-semibold text-xl">
            <div>Total:</div>
            <div>Rs. {calculateTotal()}</div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Your cart is empty</div>
      )}
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default MyCart;
