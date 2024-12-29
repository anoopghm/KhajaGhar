import { Link } from "react-router-dom"; 
import Navbar from "../../components/Navbar/Navbar";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="flex items-center justify-center w-96 border rounded bg-white px-7 py-10">
          <form action="">
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            />
            <br />
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full max-w-xs">
              SignUp
            </button>
            <p className="text-sm text-center mt-4">
               Have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
