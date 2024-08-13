import { getWebsiteExtensions } from "./FormInputUtil"; // Replace with actual file path

describe("getWebsiteExtensions", () => {
  it("should generate correct website extensions", () => {
    const baseUrl = "example";
    const expectedExtensions = [
      "example.com",
      "example.org",
      "example.net",
      "example.in",
      "example.ai",
      "example.io",
    ];

    const result = getWebsiteExtensions(baseUrl);

    expect(result).toEqual(expectedExtensions);
  });

  it("should handle empty base URL", () => {
    const baseUrl = "";
    const expectedExtensions = [".com", ".org", ".net", ".in", ".ai", ".io"];

    const result = getWebsiteExtensions(baseUrl);

    expect(result).toEqual(expectedExtensions);
  });

  it("should handle base URL with trailing slash", () => {
    const baseUrl = "example/";
    const expectedExtensions = [
      "example/.com",
      "example/.org",
      "example/.net",
      "example/.in",
      "example/.ai",
      "example/.io",
    ];

    const result = getWebsiteExtensions(baseUrl);

    expect(result).toEqual(expectedExtensions);
  });
});
