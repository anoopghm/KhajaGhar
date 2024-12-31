import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance";
import { validateEmail } from "../../utilities/helper";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
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
      const response = await axiosInstance.post("/adminlogin", { email, password });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/admin");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center mt-28">
        <div className="flex items-center justify-center w-96 border rounded bg-white px-7 py-10">
          <form className="w-full" onSubmit={handleAdminLogin}>
            <h4 className="text-2xl mb-7 text-center">Admin Login</h4>
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
          </form>
        </div>
      </div>
  )
}

export default AdminLogin;