import { getBaseUrl } from "./ConfigUtil";

// Jest setup for environment variables
describe("getBaseUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env to its original state before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore process.env to its original state after all tests
    process.env = originalEnv;
  });

  test("returns the API base URL from environment variables", () => {
    // Mock the environment variable
    process.env.REACT_APP_FOODIEDELIGHT_API_BASE_URL =
      "https://api.foodiedelight.com";

    // Call the function and check the return value
    const baseUrl = getBaseUrl();
    expect(baseUrl).toBe("https://api.foodiedelight.com");
  });

  test("returns undefined if the API base URL is not set in environment variables", () => {
    // Ensure the environment variable is not set
    delete process.env.REACT_APP_FOODIEDELIGHT_API_BASE_URL;

    // Call the function and check the return value
    const baseUrl = getBaseUrl();
    expect(baseUrl).toBeUndefined();
  });
});
