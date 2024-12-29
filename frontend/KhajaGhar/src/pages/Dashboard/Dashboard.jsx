import FoodDetails from "../../components/FoodDetails/FoodDetails";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div 
        className="text-4xl font-bold text-center text-red-600 mt-28 pt-20"
      >
        Unleash Your Craving
      </div>
      <FoodDetails />
      <Footer />
    </div>
  );
}

export default Dashboard;
