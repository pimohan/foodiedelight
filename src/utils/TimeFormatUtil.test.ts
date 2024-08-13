// your-file-name.test.js (replace with your actual file name)
import dayjs from "dayjs"; // Import dayjs for mocking (optional)

import {
  formattedTimeRange,
  convertTimeRangeStringToTime,
} from "./TimeFormatUtil"; // Replace with your actual path

// Mock dayjs to control the output of formatting
jest.mock("dayjs", () => {
  const actualDayjs = jest.requireActual("dayjs");
  return (date: any) => {
    // Return a mock dayjs object
    return {
      format: (formatString: string) => {
        if (date === "2024-01-01T09:00:00.000Z") return "09:00 AM";
        if (date === "2024-01-01T17:00:00.000Z") return "05:00 PM";
        return actualDayjs(date).format(formatString);
      },
    };
  };
});

describe("formattedTimeRange", () => {
  it("should format a range of time values into a time range string", () => {
    const input = [
      "2024-01-01T09:00:00.000Z", // Mocked as '09:00 AM'
      "2024-01-01T17:00:00.000Z", // Mocked as '05:00 PM'
    ];

    const result = formattedTimeRange(input);

    expect(result).toBe("09:00 AM - 05:00 PM");
  });

  it("should handle an empty array", () => {
    const result = formattedTimeRange([]);

    expect(result).toBe("");
  });

  it("should handle a single time value in the array", () => {
    const input = ["2024-01-01T09:00:00.000Z"]; // Mocked as '09:00 AM'

    const result = formattedTimeRange(input);

    expect(result).toBe("09:00 AM");
  });

  it("should handle invalid time values gracefully", () => {
    const input = ["invalid-time"];

    const result = formattedTimeRange(input);

    expect(result).toBe("Invalid Date");
  });
});

describe("convertTimeRangeStringToTime", () => {
  it("should return an array of dayjs objects for a valid time range string", () => {
    const input = "09:00 AM - 05:00 PM";
    const result = convertTimeRangeStringToTime(input);

    expect(result).not.toBeNull(); // Ensure result is not null

    const expectedStart = dayjs("09:00 AM", "hh:mm A");
    const expectedEnd = dayjs("05:00 PM", "hh:mm A");

    expect(result).toHaveLength(2);
    expect(result && result[0].format("hh:mm A")).toBe(
      expectedStart.format("hh:mm A")
    );
    expect(result && result[1].format("hh:mm A")).toBe(
      expectedEnd.format("hh:mm A")
    );
  });

  it("should return null for invalid time range formats", () => {
    const invalidInputs = [
      "09:00 - 05:00 PM", // Missing AM/PM
      "09:00 AM - 25:00 PM", // Invalid hour
      "09:00 AM - 05:00 PM PM", // Extra PM
      "invalid format", // Non-time format
      "", // Empty string
      "09:00 AM - 09:00 PM PM", // Extra PM
    ];

    invalidInputs.forEach((input) => {
      expect(convertTimeRangeStringToTime(input)).toBeNull();
    });
  });

  it("should return null for null or undefined inputs", () => {
    const nullInput = null;
    const undefinedInput = undefined;

    expect(convertTimeRangeStringToTime(nullInput)).toBeNull();
    expect(convertTimeRangeStringToTime(undefinedInput)).toBeNull();
  });

  // it("should handle edge cases with times at boundaries", () => {
  //   const inputMidnight = "12:00 AM - 11:59 PM";
  //   const inputNoon = "12:00 PM - 12:00 PM";

  //   const resultMidnight = convertTimeRangeStringToTime(inputMidnight);
  //   const resultNoon = convertTimeRangeStringToTime(inputNoon);

  //   expect(resultMidnight).not.toBeNull(); // Ensure result is not null
  //   expect(resultNoon).not.toBeNull(); // Ensure result is not null

  //   expect(resultMidnight).toHaveLength(2);
  //   expect(resultMidnight && resultMidnight[0].format("hh:mm A")).toBe(
  //     "12:00 AM"
  //   );
  //   expect(resultMidnight && resultMidnight[1].format("hh:mm A")).toBe(
  //     "11:59 PM"
  //   );

  //   expect(resultNoon).toHaveLength(2);
  //   expect(resultNoon && resultNoon[0].format("hh:mm A")).toBe("12:00 PM");
  //   expect(resultNoon && resultNoon[1].format("hh:mm A")).toBe("12:00 PM");
  // });
});
