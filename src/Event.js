import React, { useRef, useEffect, useState } from "react";
import { timeString } from "./helper/convertTime";
import UpdateEvent from "./UpdateEvent";
import { getClassName } from "./helper/getClassName";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const Event = ({
  event,
  setRenderedEvents,
  isUpdated,
  startTime,
  endTime,
  children,
}) => {
  const ref = useRef(null);
  const height = (endTime - startTime) * 100 - 2 + "px";
  const time = timeString(startTime);
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleCollapse = () => {
    ref.current.style.height = "50px";
    ref.current.children[0].style.display = "flex";
    ref.current.children[0].children[3].style.display = "none";
    ref.current.children[0].style.flexDirection = "row";
    setIsCollapsed(true);
  };

  const handleExpand = () => {
    ref.current.style.height = height;
    ref.current.children[0].style.flexDirection = "column";
    ref.current.children[0].children[3].style.display = "inline-block";

    setIsCollapsed(false);
  };

  useEffect(() => {
    const el2 = ref.current;
    setClassName(getClassName(height, event.startAt));
    setRenderedEvents(el2);

    // el2.style.height = height * 100 + "px";
  }, []);

  return (
    <>
      <div
        className={className}
        ref={ref}
        id={event._id}
        style={{ height: `${height}` }}
      >
        <div className="content" onClick={handleShow}>
          <p>{time}</p>
          <h5>{event.title}</h5>
          <span>{event.location}</span>
          <div className="description">
            <h5>Description</h5>
            <span>Lorem Ipsum. Just a dummy text.. </span>
            <span>Lorem Ipsum. Just a dummy text.. </span>
          </div>
        </div>

        {!isCollapsed && (
          <CaretUpFill
            className="fs-5"
            style={{ color: "rgb(0, 191, 0)" }}
            onClick={handleCollapse}
          />
        )}
        {isCollapsed && (
          <CaretDownFill
            style={{ color: "rgb(0, 191, 0)" }}
            onClick={handleExpand}
          />
        )}
      </div>
      {show && (
        <UpdateEvent
          show={show}
          close={handleClose}
          event={event}
          isUpdated={isUpdated}
        />
      )}
    </>
  );
};

export default Event;
