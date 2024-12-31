import { useState, useEffect } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditFood = () => {
  const [foods, setFoods] = useState([]);
  const [editFood, setEditFood] = useState(null); // Store food item to be edited
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food items from the backend
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance.get("/fooditems");
        setFoods(response.data); // Set food items in state
      } catch (error) {
        setError("Error fetching food items.");
      }
    };
    fetchFoods();
  }, []);

  const handleEditFood = async (foodId) => {
    console.log("Selected foodId:", foodId); // Debugging: check the foodId
    if (!foodId) {
      setError("Invalid food ID selected."); // Set error if foodId is invalid
      return;
    }

    try {
      // Fetch food details for editing using food ID
      const response = await axiosInstance.get(`/fooditems/${foodId}`);
      const foodData = response.data;
      setName(foodData.name);
      setPrice(foodData.price);
      setDescription(foodData.description);
      setImage(foodData.image);
      setEditFood(foodData); // Set the food data to be edited
      setError(null); // Clear previous errors
    } catch (error) {
      setError("Error fetching food item details for editing.");
    }
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !description.trim()) {
      setError("Please fill in all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("price", price);
    formData.append("description", description.trim());
    if (image) formData.append("image", image);

    try {
      // Use PATCH for updating the food item
      const response = await axiosInstance.patch(`/fooditems/${editFood._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.message) {
        setError(response.data.message);
      } else {
        setError(""); // Clear any errors
        setEditFood(null); // Clear the edit form
        navigate("/admin"); // Redirect to the admin page
      }
    } catch (error) {
      setError("Error updating food item.");
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Food Items</h2>

      <div className="mb-6">
        {foods.length === 0 ? (
          <p>No food items found.</p>
        ) : (
          <ul>
            {foods.map((food) => (
              <li key={food.id} className="mb-4">
                <span>{food.name} - Rs.{food.price}</span>
                <button
                  onClick={() => handleEditFood(food._id)} // Pass food ID instead of food.name
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editFood && (
        <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleUpdateFood}>
          <h3 className="text-xl font-bold mb-4">Edit Food Item</h3>

          <input
            type="text"
            placeholder="Food Name"
            className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Food Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 w-full bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          ></textarea>

          <div>
            <label
              htmlFor="food-image"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Upload Image (optional)
            </label>
            <input
              type="file"
              id="food-image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>} {/* Display error message */}

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
          >
            Update Food
          </button>
        </form>
      )}
    </div>
  );
};

export default EditFood;
