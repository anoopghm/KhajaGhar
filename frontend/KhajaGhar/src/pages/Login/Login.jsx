import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "../../components/Navbar/Navbar";
import { validateEmail } from "../../utilities/helper";
import { useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/login", { email, password });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="flex items-center justify-center w-96 border rounded bg-white px-7 py-10">
          <form className="w-full" onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">Login</h4>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={email}
              onChange={handleChange}
              aria-label="Email"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={password}
              onChange={handleChange}
              aria-label="Password"
            />
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full max-w-xs ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
