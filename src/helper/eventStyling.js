import { convert } from "./checkOverLapping";
import { getClassName } from "./getClassName";

const eventStyling = (startTime, endTime, parentStartTime) => {
  const height = (convert(endTime) - convert(startTime)) * 100;
  const marginTop = convert(startTime) - convert(parentStartTime);
  const className = getClassName(height, convert(startTime));
  return { height, marginTop, className };
};

export { eventStyling };
