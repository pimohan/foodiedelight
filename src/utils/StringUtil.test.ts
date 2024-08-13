import { initCap } from "./StringUtil"; // Replace with actual path

describe("initCap", () => {
  it("should capitalize the first letter of a string", () => {
    const text = "hello world";
    const result = initCap(text);
    expect(result).toBe("Hello world");
  });

  it("should handle empty string", () => {
    const text = "";
    const result = initCap(text);
    expect(result).toBe("");
  });

  it("should handle string with only one letter", () => {
    const text = "a";
    const result = initCap(text);
    expect(result).toBe("A");
  });

  // it("should handle string with special characters", () => {
  //   const text = "!hello world!";
  //   const result = initCap(text);
  //   expect(result).toBe("!Hello world!");
  // });

  // it("should handle string with numbers", () => {
  //   const text = "123hello";
  //   const result = initCap(text);
  //   expect(result).toBe("123Hello");
  // });
});
