import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Calendar2Check } from "react-bootstrap-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    const result = fetch("/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.ok) {
          localStorage.removeItem("name");
          localStorage.removeItem("isAuthenticated");

          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const name = localStorage.getItem("name");

  return (
    <Navbar variant="dark" className="nav-bar sticky-top">
      <Container>
        <Navbar.Brand to="#calendar">
          <Calendar2Check className="fs-1" />
        </Navbar.Brand>
        {name && (
          <>
            <Nav className="me-auto">
              <Link to="calendar" className="nav-link">
                View Calendar
              </Link>
              <Link to="create-event" className="nav-link">
                Create Event
              </Link>
              <Link to="create-all-day" className="nav-link">
                Create All-Day Event
              </Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as: {name}</Navbar.Text>
              <a onClick={logOut} className="btn ms-5">
                Logout
              </a>
            </Navbar.Collapse>
          </>
        )}
        {!name && (
          <>
            <Nav className="me-auto justify-content-end"></Nav>
            <Navbar.Collapse className="justify-content-end">
              <Link to="sign-up" className="btn ms-5">
                Register
              </Link>
              <Link to="/" className=" btn ms-5">
                LogIn
              </Link>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
