import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utilities/axiosInstance";
import { validateEmail } from "../../utilities/helper";
import { useState } from "react";

const SignUp = () => {

  const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name) {
            setError("Please enter your name.");
            return;
         }
    
        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
    
        if(!password){
            setError("Please enter a valid password.");
            return;
        }
      
        setError('')
        //SignUp API call

        try{
          const response = await axiosInstance.post("/create-account",{
            fullName:name,
             email:email,
             password: password,
          });
 
      // Handle successful registration response
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/home')
      }
       } catch(error) {
           //Handling login error
           if(error.response && error.response.data && error.response.data.message){
             setError(error.response.data.message);
           } else{
             setError("An unexpected error occured. Please try again.");
           }
       }
    };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="flex items-center justify-center w-96 border rounded bg-white px-7 py-10">
          <form action="" onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
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
