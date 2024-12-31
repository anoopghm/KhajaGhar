import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditFood from "../../components/EditFood/EditFood";
import AddFood from "../../components/AddFood/AddFood";
import AddAdmin from "../../components/AddAdmin/AddAdmin";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();

  const handlelogout = () => {
    navigate("/adminlogin");
  };

  return (
    <div className="flex h-screen bg-slate-700">
      {/* Sidebar */}
      <div className="w-1/5 flex flex-col text-white items-center h-full justify-evenly bg-gray-800">
        <button className="w-full px-6 py-4 text-white bg-blue-500 rounded hover:bg-blue-700">
          Manage Order
        </button>
        <button
          className="w-full px-6 py-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setSelectedComponent("addFood")}
        >
          Add Food
        </button>
        <button
          className="w-full px-6 py-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setSelectedComponent("editFood")}
        >
          Edit Foods
        </button>
        <button className="w-full px-6 py-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => setSelectedComponent("addadmin")}
        >
          Add Admin
        </button>
        <button
          className="w-full px-6 py-4 text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handlelogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col items-center justify-evenly overflow-y-auto">
        {selectedComponent === "editFood" && <EditFood />}
        {selectedComponent === "addFood" && <AddFood />}
        {selectedComponent === "addadmin" && <AddAdmin />}
      </div>
    </div>
  );
};

export default Admin;
