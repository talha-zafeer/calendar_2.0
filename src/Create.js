import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import TimeList from "./TimeList";
import { Spinner } from "react-bootstrap";

const Create = () => {
  const time = [];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Karachi");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://api.geonames.org/searchJSON?q=*&country=pk&username=t032`)
      .then((res) => res.json())
      .then((data) => setCities(data.geonames));

    const startTimeDropDown = document.querySelector(".start-time");
    const endTimeDropDown = document.querySelector(".end-time");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startAt = new Date();
    const endAt = new Date();
    if (startTime.includes(".")) {
      startAt.setHours(
        startTime.substring(0, startTime.indexOf(".")),
        "30",
        "00"
      );
    } else {
      startAt.setHours(startTime, "00", "00");
    }
    if (endTime.includes(".")) {
      endAt.setHours(endTime.substring(0, endTime.indexOf(".")), "30", "00");
    } else {
      endAt.setHours(endTime, "00", "00");
    }
    setIsPending(true);
    try {
      await fetch("/events/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          location,
          startAt,
          endAt,
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

export default Create;
