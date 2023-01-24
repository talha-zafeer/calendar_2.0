import { useEffect, useState } from "react";
import { ChevronCompactLeft } from "react-bootstrap-icons";
import AllDayEvent from "./AllDayEvent";
import { alignTasks } from "./helper/alignTasks";
import Hour from "./Hour";
import { overLappingEvents } from "./helper/checkOverLapping";
import Event from "./Event";
import DummyEvent from "./DummyEvent";

const Calendar = () => {
  const amHours = [];
  const pmHours = [];
  const renderedEvents = [];
  const [events, setEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  const [overlappingEvents, setOverLappingEvents] = useState([]);
  const [arr, setArr] = useState([]);
  const [parent, setParent] = useState([]);

  const isUpdated = () => {
    if (flag === true) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };

  async function getEvents() {
    try {
      const result = await fetch("/events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let { data } = await result.json();
      setEvents(data.events);
      setDayEvents(data.dayEvents);
      setOverLappingEvents(overLappingEvents(data.events));
      setFlag(true);
    } catch (err) {
      console.log("Error ", err);
    }
  }

  // events.sort((a, b) => (a.endAt - a.startAt < b.endAt - b.startAt ? 1 : -1));

  function setRenderedEvents(event) {
    renderedEvents.push(event);
  }

  for (let i = 0; i < 12; i++) {
    amHours.push(i);
    pmHours.push(i + 12);
  }

  const generatedEvents = () => {
    overlappingEvents.map((events, idx) => {
      setParent((current) => [...current, events[0]]);
      setArr((current) => [
        ...current,
        <DummyEvent events={events} isUpdated={isUpdated} />,
      ]);
      // events.map((event) => {
      //   // arr.push(<DummyEvent event={event} />);
      // });
    });
  };

  useEffect(() => {
    getEvents();
    alignTasks(renderedEvents);
    generatedEvents();
  }, [flag]);

  return (
    <div className="calendar">
      <header>
        <p>
          Friday,<span> </span> April 1
        </p>
      </header>
      <div className="all-day-task">
        {dayEvents &&
          dayEvents.map((event) => (
            <AllDayEvent event={event} isUpdated={isUpdated} key={event._id} />
          ))}
      </div>
      <div className="am">
        <h1>AM</h1>
        <div className="hours">
          {arr &&
            amHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                setRenderedEvents={setRenderedEvents}
                isUpdated={isUpdated}
                arr={arr}
                parent={parent}
              />
            ))}
        </div>
      </div>
      <div className="pm">
        <h1>PM</h1>
        <div className="hours">
          {arr &&
            pmHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                setRenderedEvents={setRenderedEvents}
                isUpdated={isUpdated}
                arr={arr}
                parent={parent}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
