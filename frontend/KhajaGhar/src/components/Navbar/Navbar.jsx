import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import MyCart from "../../pages/MyCart/MyCart.jsx"; // Import MyCart
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const Navbar = ({ value, cartItems}) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State to control cart visibility
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedin(!!token); // Set isLoggedin to true if token exists
  }, []); // The empty dependency array ensures this only runs once, when the component mounts.

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate("/login"); // Redirect to login page after logout
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
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
            <FaBars />
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
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {value}
              </span>
            </button>
          )}
          {isLoggedin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700">
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
          onClick={handleMenuClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={handleMenuToggle}
          className="absolute top-4 right-4 text-gray-700 text-2xl"
        >
          <FaBars />
        </button>
        <button
          className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
          onClick={handleMenuClose}
        >
          About Us
        </button>
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
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex gap-4 justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <MyCart cartItems={cartItems} />
            <button
              className="mt-4 text-white bg-red-600 px-4 py-2 rounded"
              onClick={handleCartToggle}
             >
              Close Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Define prop types for validation
Navbar.propTypes = {
  value: PropTypes.number.isRequired,
  cartItems: PropTypes.object.isRequired,
};

export default Navbar;
