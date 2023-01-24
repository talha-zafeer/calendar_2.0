import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      if (data.errors) {
        console.log(data.errors);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        setIsPending(true);
        navigate("/calendar");
      }
    } catch (error) {
      console.log("fghfjj", error);
    }
  };
  return (
    <Row className="signup">
      <Col></Col>
      <Col></Col>

      <Col className="my-5 py-5">
        <div className="fs-3">Please Register</div>

        <Form className="mt-5 mb-3 p-5 form-design" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-2" controlId="">
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="py-2">{emailError}</div>
            </Form.Group>
            <Form.Group as={Col} className="mb-2" controlId="">
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="py-2">{emailError}</div>
            </Form.Group>
          </Row>
          <Form.Group className="mb-4" controlId="Email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="py-2">{emailError}</div>
          </Form.Group>

          <Form.Group className="mb-4" controlId="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="py-2">{passwordError}</div>
          </Form.Group>
          {!isPending && (
            <Button variant="light" type="submit" className="px-3 py-1 fs-5">
              Register
            </Button>
          )}
          {isPending && (
            <Button variant="light" type="submit" disabled>
              Registering ...
            </Button>
          )}
        </Form>
      </Col>
      <Col></Col>
      <Col></Col>
    </Row>
  );
};

export default SignUp;
