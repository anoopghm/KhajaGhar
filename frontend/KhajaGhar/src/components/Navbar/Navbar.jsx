import { useState } from "react";
import { FaBars } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import MyCart from "../../pages/MyCart/MyCart.jsx";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const Navbar = ({ value }) => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State to control cart visibility

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen); // Toggle cart visibility
  };

  return (
    <div className="bg-gray-100 shadow-md p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Menu Icon */}
        <div className="relative flex items-center space-x-2">
          <button
            onClick={handleMenuToggle}
            className="text-gray-700 text-2xl hover:text-gray-900"
          >
            <FaBars /> {/* Single icon for toggle */}
          </button>
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-12 w-auto rounded-md" />
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for food"
          className="hidden md:block px-4 py-2 border rounded w-80"
        />

        {/* Cart and Login/Logout */}
        <div className="flex items-center space-x-8">
          {isLoggedin && (
            <button onClick={handleCartToggle} className="relative">
              <img src={cart} alt="Cart" className="h-6 w-6" />
              {/* Cart badge if needed */}
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {value}
              </span>
            </button>
          )}
          {/* Conditional button rendering */}
          {isLoggedin ? (
            <button
              onClick={() => setIsLoggedin(false)}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="mt-4 block md:hidden">
        <input
          type="text"
          placeholder="Search for food"
          className="px-4 py-2 border rounded w-full"
        />
      </div>

      {/* Menu Overlay and Sliding Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={handleMenuClose} // Close the menu when clicking outside
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Same menu icon for closing */}
        <button
          onClick={handleMenuToggle}
          className="absolute top-4 right-4 text-gray-700 text-2xl"
        >
          <FaBars /> {/* Single icon for open/close */}
        </button>
        <button
          className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
          onClick={handleMenuClose}
        >
          About Us
        </button>
        {/* Home Button: Using Link for navigation */}
        <Link to="/home">
          <button
            className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
            onClick={handleMenuClose}
          >
            Home
          </button>
        </Link>
        <button
          className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
          onClick={handleMenuClose}
        >
          Contact Us
        </button>
      </div>

      {/* Conditionally Render the MyCart Component */}
      {cartOpen && <MyCart />}
    </div>
  );
};

// Define prop types for validation
Navbar.propTypes = {
  value: PropTypes.number.isRequired, // Ensure value is a number and is required
};

export default Navbar;
