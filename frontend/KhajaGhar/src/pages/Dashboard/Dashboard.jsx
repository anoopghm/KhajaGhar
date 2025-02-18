import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FoodDetails from "../../components/FoodDetails/FoodDetails";


const Dashboard = () => {

  return (
    <>
      <Navbar  />
      <div className="text-4xl font-bold text-center text-red-600 mt-28 pt-20">
        Unleash Your Craving
      </div>
      <FoodDetails/>
      <Footer />
    </>
  );
};



export default Dashboard;
