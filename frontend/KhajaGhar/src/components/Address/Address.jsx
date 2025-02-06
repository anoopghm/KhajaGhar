const Address = () => {
  return (
    <div className="p-4 mt-12 bg-white space-y-4 shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add Details</h2>
      <form className="space-y-4">
        <input
          type="number"
          placeholder="Mobile Number"
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:outline-none"
        maxLength = "10"
        />
        <input
          type="text"
          placeholder="Landmark"
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:outline-none"
        />
        <select
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select Your Area
          </option>
          <option value="Lakeside">Lakeside</option>
          <option value="Prithvi Chowk">Prithvi Chowk</option>
          <option value="Chhorepatan">Chhorepatan</option>
          <option value="Bagar">Bagar</option>
          <option value="Sedi Bagar">Sedi Bagar</option>
          <option value="Lalit Chowk">Lalit Chowk</option>
          <option value="Chipledunga">Chipledunga</option>
          <option value="Airport">Airport</option>
          <option value="Begnas Tal">Begnas Tal</option>
          <option value="Rambazar">Rambazar</option>
          <option value="Tutunga">Tutunga</option>
          <option value="Dobilla">Dobilla</option>
          <option value="Pardi">Pardi</option>
        </select>
        <input
          type="text"
          placeholder="Zip Code"
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
        >
          Place Order
         </button>
      </form>
    </div>
  );
};

export default Address;
