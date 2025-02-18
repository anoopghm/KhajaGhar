import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Admin from "./pages/Admin/Admin";
import Address from "./components/Address/Address";
import { Provider } from "react-redux";
import { store } from "./app/store";

const routes = (
  <Router>
      <Routes>
         <Route path="/login" exact element={<Login/>} />
         <Route path="/signup" exact element={<SignUp/>} />
         <Route path="/" exact element={<Dashboard/>} />
         <Route path="/adminlogin" exact element={<AdminLogin/>}/>
         <Route path="/admin" exact element={<Admin/>}/>
         <Route path="/details" exact element={<Address/>}/>
     </Routes>
  </Router>
);

const App = () => {
  return (
    <Provider store = {store}>
        {routes}
    </Provider>
  );
};

export default App;
