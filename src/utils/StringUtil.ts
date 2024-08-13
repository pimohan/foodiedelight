/**
 * Capitalizes the first letter of a given string.
 *
 * @param text - The string whose first letter will be capitalized.
 * @returns A new string with the first letter capitalized.
 */
export const initCap = (text: string): string => {
  return text.replace(/^\w/, (c) => c.toUpperCase());
};
