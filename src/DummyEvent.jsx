import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { timeString } from "./helper/convertTime";
import { getClassName } from "./helper/getClassName";
import { randomColor } from "./helper/randomColor";
import UpdateEvent from "./UpdateEvent";

const DummyEvent = ({ events, isUpdated }) => {
  const [className, setClassName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const renderChildren = (children, parentIndex) => {
    return children.map((child, index) => {
      if (index === parentIndex + 1) {
        let parentStartTime = new Date(children[index].startAt);
        if (index > 0) parentStartTime = new Date(children[index - 1].startAt);
        let startTime = new Date(child.startAt);
        let endTime = new Date(child.endAt);
        if (parentStartTime.getMinutes() == "30") {
          parentStartTime = parentStartTime.getHours() + ".5";
        } else {
          parentStartTime = parentStartTime.getHours().toString();
        }
        if (startTime.getMinutes() == "30") {
          startTime = startTime.getHours() + ".5";
        } else {
          startTime = startTime.getHours().toString();
        }
        if (endTime.getMinutes() == "30") {
          endTime = endTime.getHours() + ".5";
        } else {
          endTime = endTime.getHours().toString();
        }
        const height = (endTime - startTime) * 100;
        const marginTop = startTime - parentStartTime;

        const className = getClassName(height, startTime);
        console.log();
        return (
          <div
            className={className}
            style={{
              height: `${height}px`,
              marginTop: `${marginTop * 100 - 10}px`,
              backgroundColor: "salmon",
              borderLeft: `7px solid salmon`,
            }}
          >
            <div className="content" onClick={handleShow}>
              <p>{timeString(startTime)}</p>
              <h5>{child.title}</h5>
              <span>{child.location}</span>
              {/* <div className="description">
                <h5>Description</h5>
                <span>Lorem Ipsum. Just a dummy text.. </span>
              </div> */}
            </div>
            {show && (
              <UpdateEvent
                show={show}
                close={handleClose}
                event={child}
                isUpdated={isUpdated}
              />
            )}
            {/* {child.startTime} - {child.endTime} */}
            {events[index + 1] && renderChildren(events, index)}
          </div>
        );
      }
    });
  };

  return <>{renderChildren(events, -1)}</>;
};

export default DummyEvent;
