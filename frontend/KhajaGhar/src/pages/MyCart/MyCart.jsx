import PropTypes from "prop-types";

const MyCart = ({ cartItems }) => {
  const items = Object.entries(cartItems); // Convert to array for iteration

  return (
    <div>
      <h2 className="text-lg font-bold">Your Cart</h2>
      {items.length > 0 ? (
        <ul>
          {items.map(([id, item]) => (
            <li key={id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

// Define prop types
MyCart.propTypes = {
  cartItems: PropTypes.object.isRequired, // Expecting an object with item details
};

export default MyCart;
