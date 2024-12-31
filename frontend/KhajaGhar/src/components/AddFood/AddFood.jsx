import { useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a valid food name.");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setError("Please enter a valid positive price.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a valid description.");
      return;
    }
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("price", price);
    formData.append("description", description.trim());
    formData.append("image", image);

    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/addfoods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.error) {
        setError(response.data.message);
        return;
      }

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setSuccess("Food item added successfully!");
        // Optionally redirect after showing the success message
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="text-white flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Food Item</h2>
      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleAddFood}>
        <input
          type="text"
          placeholder="Food Name"
          className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
            setSuccess(null);
          }}
        />

        <input
          type="number"
          placeholder="Food Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setError(null);
            setSuccess(null);
          }}
          className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(null);
            setSuccess(null);
          }}
          className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
        ></textarea>

        <div>
          <label
            htmlFor="food-image"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="food-image"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setError(null);
              setSuccess(null);
            }}
            className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
        {success && <p className="text-green-500 text-xs pb-1">{success}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
