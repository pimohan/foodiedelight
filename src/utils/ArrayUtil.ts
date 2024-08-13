import { initCap } from "./StringUtil";

/**
 * Removes a specified element from an array and optionally capitalizes the remaining elements.
 *
 * @param array - The array from which the element should be removed.
 * @param elementToRemove - The element to be removed from the array.
 * @param canElementsUpperCase - Optional flag to determine if the remaining elements should be capitalized. Defaults to true.
 * @returns A new array with the specified element removed and the remaining elements optionally capitalized.
 */
export const removeElement = (
  array: string[],
  elementToRemove: string | undefined,
  canElementsUpperCase = true
): string[] => {
  // Filter out the element to remove from the array
  const elements = [...array.filter((item) => item !== elementToRemove)];

  // Capitalize the remaining elements if the flag is true
  return canElementsUpperCase ? elements.map((e) => initCap(e)) : elements;
};
