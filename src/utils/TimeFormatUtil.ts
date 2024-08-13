import dayjs from "dayjs";

/**
 * Formats an array of time values into a string with a time range.
 *
 * @param timeRange - An array of time values to be formatted.
 * @returns A string representing the time range in "hh:mm A - hh:mm A" format.
 */
export const formattedTimeRange = (timeRange: any[]): string => {
  return timeRange.map((time) => dayjs(time).format("hh:mm A")).join(" - ");
};

/**
 * Parses a time range string and returns an array of dayjs objects representing the start and end times.
 *
 * @param timeRangeString - A string representing a time range in "hh:mm A - hh:mm A" format.
 * @returns An array of two dayjs objects representing the start and end times, or null if the format is invalid.
 */
export const convertTimeRangeStringToTime = (
  timeRangeString: string | null | undefined
): dayjs.Dayjs[] | null => {
  // Define the regex pattern for validating the time range format
  const timeRegex =
    /^(?:1[012]|0[1-9]):[0-5]\d [AP]M - (?:1[012]|0[1-9]):[0-5]\d [AP]M$/;

  // Check for invalid input
  if (!timeRangeString || typeof timeRangeString !== "string") {
    return null;
  }

  // Validate the format using regex
  if (!timeRegex.test(timeRangeString)) {
    return null;
  }

  // Extract start and end times
  const [startTime, endTime] = timeRangeString.split(" - ");

  // Return parsed dayjs objects
  return [dayjs(startTime, "hh:mm A"), dayjs(endTime, "hh:mm A")];
};
