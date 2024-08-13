/**
 * Generates a list of website URLs by appending common domain extensions to a given base URL.
 *
 * @param value - The base URL to which domain extensions will be appended.
 * @returns An array of website URLs with common domain extensions.
 */
export const getWebsiteExtensions = (value: string) =>
  // Append each domain extension to the base URL and return the array of full URLs
  [".com", ".org", ".net", ".in", ".ai", ".io"].map(
    (domain) => `${value}${domain}`
  );
