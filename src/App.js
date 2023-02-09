import "./index.css";
import Calendar from "./views/Calendar";
import NavBar from "./components/NavBar";
import Create from "./views/Create";
import SignUp from "./views/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LogIn from "./views/LogIn";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="create-event" element={<Create />} />
          </Route>
          <Route path="sign-up" element={<SignUp />} />

          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
