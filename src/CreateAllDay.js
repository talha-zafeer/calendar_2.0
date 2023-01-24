import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const CreateAllDay = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Karachi");
  const [isPending, setIsPending] = useState(false);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://api.geonames.org/searchJSON?q=*&country=pk&username=t032`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.geonames);
        console.log(data);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/events/create-all-day-event", {
        method: "POST",
        body: JSON.stringify({
          title,
          location,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/calendar");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Row className="create-event my-5 py-5">
      <Col></Col>
      <Col>
        <Form onSubmit={handleSubmit} className="form-design p-5">
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              placeholder="Seminar, Workshop or Dummy"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridState">
            <Form.Label>Event Location</Form.Label>
            <Form.Select onChange={(e) => setLocation(e.target.value)} required>
              {cities?.map((city) => (
                <option key={city.geonameId} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {!isPending && (
            <Button variant="dark" type="submit" className="my-3">
              Create
            </Button>
          )}
          {isPending && <Spinner animation="border" />}
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default CreateAllDay;
