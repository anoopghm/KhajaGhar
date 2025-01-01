import PropTypes from "prop-types";

const MyCart = ({ cartItems }) => {
  const items = Object.entries(cartItems); // Convert to array for iteration

  // Calculate total price
  const totalPrice = items.reduce(
    (total, [_, { quantity, price }]) => total + quantity * price,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Food Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(([name, { quantity, price }], index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{name}</td>
                  <td className="py-2 px-4">Rs. {price}</td>
                  <td className="py-2 px-4">{quantity}</td>
                  <td className="py-2 px-4">Rs. {price * quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-xl">
            Grand Total: Rs. {totalPrice}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">Your cart is empty!</div>
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
};

export default MyCart;
