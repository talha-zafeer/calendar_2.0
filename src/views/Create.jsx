import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import TimeList from "../components/TimeList";
import { apiHeaders } from "../constants";
import { Spinner } from "react-bootstrap";
import { convertToDate } from "../helper/convertTime";

const Create = () => {
  const time = [];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Karachi");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [cities, setCities] = useState([]);
  const [eventType, setEventType] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startTimeDropDown = document.querySelector(".start-time");
    const endTimeDropDown = document.querySelector(".end-time");

    fetch(`http://api.geonames.org/searchJSON?q=*&country=pk&username=t032`)
      .then((res) => res.json())
      .then((data) => setCities(data.geonames));

    endTimeDropDown.childNodes.forEach((time) => {
      if (parseFloat(startTime) >= parseFloat(time.value)) {
        time.disabled = true;
      } else {
        time.disabled = false;
      }
    }, []);
    startTimeDropDown.childNodes.forEach((time) => {
      if (parseFloat(endTime) <= parseFloat(time.value)) {
        time.disabled = true;
      } else {
        time.disabled = false;
      }
    });
  }, [startTime, endTime]);

  for (let i = 0; i < 24; i++) {
    time.push(i);
    time.push(i + 0.5);
  }
  const handleCheckBox = (e) => {
    setEventType(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const startAt = convertToDate(startTime);
    const endAt = convertToDate(endTime);

    setIsPending(true);
    try {
      await fetch("http://localhost:8000/events/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          location,
          startAt,
          endAt,
          type: eventType,
        }),
        headers: apiHeaders.LOGIN_HEADERS,
        credentials: "include",
      });
      navigate("/calendar");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row className="create-event my-5 py-5 align-items-center justify-content-center">
      <Col lg={4}>
        <Form onSubmit={handleSubmit} className="form-design p-5 bg-white">
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              placeholder="Seminar, Workshop or Dummy"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridState">
            <Form.Label>Event Location</Form.Label>
            <Form.Select onChange={(e) => setLocation(e.target.value)} required>
              {cities.map((city) => (
                <option
                  className="option-style"
                  key={city.geonameId}
                  value={city.name}
                >
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {!eventType && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Start Time</Form.Label>
                <Form.Select
                  className="start-time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                >
                  {time.map((t) => (
                    <TimeList time={t} key={t} />
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>End Time</Form.Label>
                <Form.Select
                  className="end-time"
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {time.map((t) => (
                    <TimeList time={t} key={t} />
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          )}
          <Row className="align-items-center justify-content-center">
            <Col>
              {!isPending && (
                <Button variant="dark" type="submit" className="my-3">
                  Create
                </Button>
              )}
              {isPending && <Spinner animation="border" />}
            </Col>
            <Col>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="All Day Event ?"
                className="text-dark"
                onClick={handleCheckBox}
              />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Create;
