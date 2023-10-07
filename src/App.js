import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import AdminHome from "./Pages/admin/Home/Home";
import AdminSignIn from "./Pages/admin/Signin/Signin";
import FlightBook from "./Pages/FlightBook/FlightBook";

function App() {
  const storedData = localStorage.getItem("users");
  const userData = JSON.parse(storedData);

  return (
    <div className="App font-nunito">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flighbook" element={<FlightBook />} />
          <Route
            path="/signup"
            element={userData?.loggedIn ? <Home /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={userData?.loggedIn ? <Home /> : <SignIn />}
          />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
