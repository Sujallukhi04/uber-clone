import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import UserSignin from "./pages/UserSignin";
import UserSignup from "./pages/UserSignup";
import CaptainSignin from "./pages/CaptainSignin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtect from "./pages/UserProtect.jsx";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtect from "./pages/CaptainProtect.jsx";
import Riding from "./pages/Riding.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserSignin />} />
          <Route path="/riding" element={<Riding />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<CaptainSignin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route
            path="/home"
            element={
              <UserProtect>
                <Home />
              </UserProtect>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtect>
                <CaptainHome />
              </CaptainProtect>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
