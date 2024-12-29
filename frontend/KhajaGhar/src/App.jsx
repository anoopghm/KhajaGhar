import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const routes = (
  <Router>
      <Routes>
         <Route path="/login" exact element={<Login/>} />
         <Route path="/signup" exact element={<SignUp/>} />
         <Route path="/home" exact element={<Dashboard/>} />
     </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
        {routes}
    </div>
  );
};

export default App;
