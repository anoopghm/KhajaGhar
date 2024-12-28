import FoodDetails from "./components/FoodDetails/FoodDetails";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <div><Navbar /></div>
      <div className="text-4xl font-bold text-center text-red-600 mt-8">
        Unleash Your Craving
      </div>
      <FoodDetails/>
    </div>
  );
};

export default App;
