const convert = (time) => {
  let t = new Date(time);
  if (t.getMinutes() == "30") {
    return t.getHours() + ".5";
  } else {
    return t.getHours().toString();
  }
};

const overLappingEvents = (events) => {
  const overlappingEvents = [];

  events.sort((a, b) => (convert(a.startAt) < convert(b.startAt) ? -1 : 1));

  // events.sort((a, b) => (convert(a.startAt) > convert(b.startAt) ? 1 : -1));
  let currentEndTime = convert(events[0].endAt),
    currentGroup = [events[0]];
  for (let i = 1; i < events.length; i++) {
    if (convert(events[i].startAt) < currentEndTime) {
      currentGroup.push(events[i]);
      currentEndTime = Math.max(currentEndTime, convert(events[i].endAt));
    } else {
      overlappingEvents.push(currentGroup);
      currentGroup = [events[i]];
      currentEndTime = convert(events[i].endAt);
    }
  }
  overlappingEvents.push(currentGroup);
  return overlappingEvents;
};

export { convert, overLappingEvents };
