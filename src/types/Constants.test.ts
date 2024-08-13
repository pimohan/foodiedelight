import { TIME_FORMAT } from "./Constants";

describe("Constants", () => {
  it("should have the correct time format", () => {
    expect(TIME_FORMAT).toBe("hh:mm A");
  });
});
