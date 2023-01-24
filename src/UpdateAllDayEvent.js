import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateAllDayEvent = ({ show, close, event, isUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [isPending, setIsPending] = useState(false);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://api.geonames.org/searchJSON?q=*&country=pk&username=t032`)
      .then((res) => res.json())
      .then((data) => setCities(data.geonames));
    console.log(event.location);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/events/updateAllDayEvent", {
        method: "PUT",
        body: JSON.stringify({
          id: event._id,
          title,
          location,
        }),
        headers: { "Content-Type": "application/json" },
      });
      isUpdated();
      close();
      navigate("/calendar");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    setIsPending(true);

    const id = event._id;
    const endpoint = `/events/deleteAllDayEvent/${id}`;

    fetch(endpoint, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        isUpdated();
        close();
        navigate("/calendar");
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
        <Modal.Header closeButton>
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          {!isPending && (
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
          {isPending && (
            <Button variant="primary" disabled>
              Saving Changes ...
            </Button>
          )}
          {!isPending && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {isPending && (
            <Button variant="danger" disabled>
              Deleting ...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateAllDayEvent;
