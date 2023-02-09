const convertTime = (time1, time2) => {
  const time = [];
  time1 = time1.substring(0, time1.indexOf(" "));
  time2 = time2.substring(0, time2.indexOf(" "));
  time1.includes(":30")
    ? time.push(parseFloat(time1.replace(":30", ".5")))
    : time.push(parseFloat(time1));
  time2.includes(":30")
    ? time.push(parseFloat(time2.replace(":30", ".5")))
    : time.push(parseFloat(time2));
  return time;
};

const timeString = (time) => {
  const convertStartTime = time.toString();
  if (convertStartTime.includes(".")) {
    time < 12
      ? (time = `${convertStartTime.replace(".5", ":30")} AM`)
      : (time = `${convertStartTime.replace(".5", ":30")} PM`);
  } else time < 12 ? (time = `${time}:00 AM`) : (time = `${time}:00 PM`);

  return time;
};

const convertToDate = (time) => {
  const date = new Date();
  if (time.includes(".")) {
    date.setHours(time.substring(0, time.indexOf(".")), "30", "00");
  } else {
    date.setHours(time, "00", "00");
  }
  return date;
};
export { convertTime, timeString, convertToDate };
