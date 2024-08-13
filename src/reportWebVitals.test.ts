import reportWebVitals from "./reportWebVitals";
import { ReportHandler } from "web-vitals";

jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe("reportWebVitals", () => {
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = require("web-vitals");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call web-vitals functions when onPerfEntry is provided", async () => {
    const mockOnPerfEntry: ReportHandler = jest.fn();

    reportWebVitals(mockOnPerfEntry);

    // Wait for the dynamic import to resolve
    await new Promise(setImmediate);

    expect(getCLS).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getFID).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getFCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getLCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getTTFB).toHaveBeenCalledWith(mockOnPerfEntry);
  });

  test("should not call web-vitals functions when onPerfEntry is not provided", async () => {
    reportWebVitals();

    // Wait for the dynamic import to resolve
    await new Promise(setImmediate);

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });

  test("should not call web-vitals functions when onPerfEntry is not a function", async () => {
    reportWebVitals({} as ReportHandler);

    // Wait for the dynamic import to resolve
    await new Promise(setImmediate);

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});
