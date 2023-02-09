import { useState } from "react";

import UpdateEvent from "./UpdateEvent";

const AllDayEvent = ({ event, isUpdated }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <div className="event-all-day" id={event._id} onClick={handleShow}>
        <p>All Day</p>
        <h5>{event.title}</h5>
        <span>{event.location}</span>
      </div>
      {show && <UpdateEvent show={show} event={event} close={handleClose} />}
    </>
  );
};

export default AllDayEvent;
