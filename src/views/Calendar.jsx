import { useEffect, useState } from "react";
import AllDayEvent from "../components/AllDayEvent";
import Hour from "../components/Hour";
import { overLappingEvents } from "../helper/checkOverLapping";
import DummyEvent from "../components/Event";
import useFetch from "../hooks/useFetch";
import { apiHeaders, apiMethods, apiEndPoints } from "../constants";

const Calendar = () => {
  const amHours = [];
  const pmHours = [];
  const renderedEvents = [];
  const [events, setEvents] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  const [overlappingEvents, setOverLappingEvents] = useState(null);
  const [arr, setArr] = useState([]);
  const [parent, setParent] = useState([]);

  const { data, isPending, error } = useFetch(
    apiEndPoints.GET_EVENTS,
    apiMethods.GET,
    apiHeaders.HEADERS
  );

  const isUpdated = () => setFlag(!flag);

  function setRenderedEvents(event) {
    renderedEvents.push(event);
  }

  for (let i = 0; i < 12; i++) {
    amHours.push(i);
    pmHours.push(i + 12);
  }

  const generatedEvents = () => {
    overlappingEvents?.map((events, idx) => {
      setParent((current) => [...current, events[0]]);
      setArr((current) => [
        ...current,
        <DummyEvent events={events} isUpdated={isUpdated} key={idx} />,
      ]);
    });
  };

  useEffect(() => {
    data && setEvents(data.events);
    data && setDayEvents(data.dayEvents);
    data && setOverLappingEvents(overLappingEvents(data.events));

    // alignTasks(renderedEvents);
    generatedEvents();
  }, [data, events]);

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
