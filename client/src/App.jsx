import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import authContext from "./context/authContext";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <Router>
      <div className="bg-gradient-to-b from-background to-green-100 h-screen ">
          <AnimateRoutes />
      </div>
    </Router>
  );
}

function AnimateRoutes(){
  const location = useLocation();
  const authState = authContext((state) => state.authState);

  return (
    <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={!authState ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/login"
              element={authState ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={authState ? <Navigate to="/" /> : <Signup />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
  )
}

export default App;
