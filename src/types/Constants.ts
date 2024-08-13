import dayjs from "dayjs";

// Default opening and closing times for a standard day
export const DEFAULT_TIME = [
  dayjs("09:00 AM", "hh:mm A"),
  dayjs("09:00 PM", "hh:mm A"),
];

// Default opening and closing times for Friday
export const DEFAULT_TIME_FRIDAY = [
  dayjs("09:00 AM", "hh:mm A"),
  dayjs("11:00 PM", "hh:mm A"),
];

// Default opening and closing times for weekends
export const DEFAULT_TIME_WEEKEND = [
  dayjs("10:00 AM", "hh:mm A"),
  dayjs("11:00 PM", "hh:mm A"),
];

// Time format used throughout the application
export const TIME_FORMAT = "hh:mm A";
