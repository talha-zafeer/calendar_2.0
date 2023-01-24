// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import Create from "./Create";
import CreateAllDay from "./CreateAllDay";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import ProtectedRoutes from "./ProtectedRoutes";
import NewLogIn from "./NewLogIn";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<NewLogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="create-event" element={<Create />} />
            <Route path="create-all-day" element={<CreateAllDay />} />
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
