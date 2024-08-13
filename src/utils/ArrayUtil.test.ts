// removeElement.test.js
import { removeElement } from "./ArrayUtil";
import { initCap } from "./StringUtil";

// // Mock the initCap function
// jest.mock("./StringUtils", () => ({
//   initCap: jest.fn(
//     (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
//   ),
// }));

describe("removeElement", () => {
  test("removes the specified element and capitalizes remaining elements by default", () => {
    const array = ["apple", "banana", "cherry"];
    const elementToRemove = "banana";
    const result = removeElement(array, elementToRemove);

    expect(result).toEqual(["Apple", "Cherry"]);
    // expect(initCap).toHaveBeenCalledTimes(2);
    // expect(initCap).toHaveBeenCalledWith("apple");
    // expect(initCap).toHaveBeenCalledWith("cherry");
  });

  test("removes the specified element and does not capitalize remaining elements if flag is false", () => {
    const array = ["apple", "banana", "cherry"];
    const elementToRemove = "banana";
    const result = removeElement(array, elementToRemove, false);

    expect(result).toEqual(["apple", "cherry"]);
    // expect(initCap).not.toHaveBeenCalled();
  });

  test("does not modify the array if the element to remove is not found", () => {
    const array = ["apple", "banana", "cherry"];
    const elementToRemove = "orange";
    const result = removeElement(array, elementToRemove);

    expect(result).toEqual(["Apple", "Banana", "Cherry"]);
    // expect(initCap).toHaveBeenCalledTimes(3);
  });

  test("returns an empty array if the input array is empty", () => {
    const array: any[] = [];
    const elementToRemove = "banana";
    const result = removeElement(array, elementToRemove);

    expect(result).toEqual([]);
    // expect(initCap).not.toHaveBeenCalled();
  });
});
