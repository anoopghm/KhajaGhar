import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utilities/helper";
import axiosInstance from "../../utilities/axiosInstance";

const AddAdmin = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleAddAdmin = async (e) => {
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
          const response = await axiosInstance.post("/create-admin",{
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
        navigate('/admin')
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
    <div className="text-white flex flex-col items-center p-8">
        <h4 className="text-2xl font-bold mb-6">Add Admin</h4>
          <form action="" onSubmit={handleAddAdmin} className="w-full max-w-md flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Name of admin"
              className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter email for admin"
              className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password for admin"
              className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 w-full max-w-xs">
              Add admin
            </button>
          </form>
        </div>
  )
}

export default AddAdmin;