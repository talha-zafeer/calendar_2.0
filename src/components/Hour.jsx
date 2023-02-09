import { convert } from "../helper/checkOverLapping";

const Hour = ({ currentHour, arr, parent }) => {
  const eventListTop = [];
  const eventListBot = [];

  parent.forEach((element, idx) => {
    const startTime = convert(parent[idx].startAt);
    if (parseFloat(startTime) === currentHour) {
      eventListTop.push(arr[idx]);
    } else if (Math.floor(startTime) === currentHour) {
      eventListBot.push(arr[idx]);
    }
  });

  return (
    <div className="hour">
      <div className="full">{currentHour + ":00"}</div>
      <div className="half">
        <div id={`full-${currentHour}`} className="half-top">
          {eventListTop}
        </div>
        <div className="half-bottom">
          <div className="half-bottom-1">{currentHour + ":30"}</div>
          <div className="half-bottom-2" id={`half-${currentHour}`}>
            {eventListBot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hour;
