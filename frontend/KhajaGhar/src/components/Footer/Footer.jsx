import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4 text-center px-6">
        
         
        <div>
          <h2 className="text-2xl font-bold">KhajaGhar</h2>
          <p className="text-sm">Give us a chance to deliver you a delicious meal.</p>
          <p className="text-sm mt-1">License No: 7128376</p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm">📞 9523127642</p>
          <p className="text-sm">✉️ khajaghar@gmail.com</p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </div>

       
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} KhajaGhar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
