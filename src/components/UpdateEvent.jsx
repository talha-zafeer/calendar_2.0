import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import TimeList from "./TimeList";
import { MDBBtn } from "mdb-react-ui-kit";
import { convert } from "../helper/checkOverLapping";
import { apiEndPoints, apiHeaders, apiMethods } from "../constants";
import { convertToDate } from "../helper/convertTime";

const UpdateEvent = ({ show, close, event, isUpdated, index }) => {
  const time = [];
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(convert(event.startAt));
  const [endTime, setEndTime] = useState(convert(event.endAt));
  const [isPending, setIsPending] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log(startTime, endTime);
    fetch(`http://api.geonames.org/searchJSON?q=*&country=pk&username=t032`)
      .then((res) => res.json())
      .then((data) => setCities(data.geonames));

    const startTimeDropDown = document.querySelector(".start-time");
    const endTimeDropDown = document.querySelector(".end-time");
    endTimeDropDown?.childNodes.forEach((time) => {
      if (parseFloat(startTime) >= parseFloat(time.value)) {
        time.disabled = true;
      } else {
        time.disabled = false;
      }
    });
    startTimeDropDown?.childNodes.forEach((time) => {
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
    const startAt = convertToDate(startTime);
    const endAt = convertToDate(endTime);

    setIsPending(true);
    try {
      await fetch(apiEndPoints.UPDATE, {
        method: apiMethods.PATCH,
        body: JSON.stringify({
          id: event._id,
          title,
          location,
          startAt,
          endAt,
        }),
        headers: { "Content-Type": "application/json" },
      });
      close();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    setIsPending(true);

    fetch(`${apiEndPoints.DELETE}/${event._id}`, {
      method: apiMethods.DELETE,
      headers: apiHeaders.HEADERS,
    })
      .then((response) => response.json())
      .then(() => {
        // isUpdated();
        close();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                placeholder="Seminar, Workshop or Dummy"
                defaultValue={event.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridState">
              <Form.Label>Event Location</Form.Label>
              <Form.Select
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value={event.location}>{event.location}</option>
                {cities.map((city) => (
                  <option key={city.geonameId} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {!event.type && (
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Select
                    defaultValue={startTime}
                    className="start-time"
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    {time.map((t) => (
                      <TimeList time={t} key={t} />
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>End Time</Form.Label>
                  <Form.Select
                    defaultValue={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="end-time"
                  >
                    {time.map((t) => (
                      <TimeList time={t} key={t} />
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <MDBBtn className="border-0 bg-primary" onClick={close}>
            Close
          </MDBBtn>
          {!isPending && (
            <Button
              variant="success"
              className="border-0"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          )}
          {isPending && (
            <Button
              variant="success"
              className="border-0"
              onClick={handleSubmit}
            >
              Saving Changes ...
            </Button>
          )}
          {!isPending && (
            <Button
              variant="danger"
              className="border-0"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          {isPending && (
            <Button
              variant="danger"
              className="border-0"
              onClick={handleDelete}
            >
              Deleting ...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateEvent;
