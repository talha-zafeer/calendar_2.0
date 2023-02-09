import React, { useState } from "react";
import { convert } from "../helper/checkOverLapping";
import { timeString } from "../helper/convertTime";
import { eventStyling } from "../helper/eventStyling";
import UpdateEvent from "./UpdateEvent";

const DummyEvent = ({ events, isUpdated }) => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const renderChildren = (children, parentIndex) => {
    return children.map((child, index) => {
      if (index === parentIndex + 1) {
        let parentStartTime = new Date(children[index].startAt);
        if (index > 0) parentStartTime = new Date(children[index - 1].startAt);

        const { height, marginTop, className } = eventStyling(
          child.startAt,
          child.endAt,
          parentStartTime
        );

        return (
          <div
            className={className}
            style={{
              height: `${height}px`,
              marginTop: `${marginTop * 100 - 10}px`,
              backgroundColor: "rgb(250,128,114)",
              border: "1px solid white",
            }}
            key={child._id}
          >
            <div className="content" onClick={() => handleShow(child)}>
              <p>{timeString(convert(child.startAt))}</p>
              <h5>{child.title}</h5>
              <span>{child.location}</span>
            </div>

            {show && selectedEvent._id === child._id && (
              <UpdateEvent
                show={show}
                event={selectedEvent}
                close={handleClose}
              />
            )}

            {events[index] && renderChildren(events, index)}
          </div>
        );
      }
    });
  };

  return <>{renderChildren(events, -1)}</>;
};

export default DummyEvent;
