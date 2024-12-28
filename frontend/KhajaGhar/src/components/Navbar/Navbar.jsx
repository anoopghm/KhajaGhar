import logo from '../../assets/logo.png';

const isLoggedin = false;

const Navbar = () => {
  return (
    <div className="p-4 bg-gray-100 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-12 w-13 rounded radius-2" />
      <button className="px-4 py-2 bg-red-600 text-white rounded">About Us</button>
      <input type="text" placeholder="Search for food" className="px-4 py-2 border rounded" />
      <button className="px-4 py-2 bg-red-600 text-white rounded">Home</button>
      <button className="px-4 py-2 bg-red-600 text-white rounded">Contact Us</button>
      <div className="flex justify-end">
        {!isLoggedin ? (
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Login
          </button>
        ) : (
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
