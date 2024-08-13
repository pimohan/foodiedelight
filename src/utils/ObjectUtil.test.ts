// import { isEmptyObject, omitNullAndUndefined } from "./ObjectUtil"; // Replace with actual path

// describe("isEmptyObject", () => {
//   it("should return true for empty object", () => {
//     expect(isEmptyObject({})).toBe(true);
//   });

//   it("should return false for non-empty object", () => {
//     expect(isEmptyObject({ a: 1 })).toBe(false);
//   });

//   it("should return false for null", () => {
//     expect(isEmptyObject(null)).toBe(false);
//   });

//   it("should return false for undefined", () => {
//     expect(isEmptyObject(undefined)).toBe(false);
//   });

//   // it("should return false for arrays", () => {
//   //   expect(isEmptyObject([])).toBe(false);
//   // });

//   it("should return false for strings", () => {
//     expect(isEmptyObject("test")).toBe(false);
//   });

//   it("should return false for numbers", () => {
//     expect(isEmptyObject(123)).toBe(false);
//   });

//   it("should return false for booleans", () => {
//     expect(isEmptyObject(true)).toBe(false);
//   });
// });

// describe("omitNullAndUndefined", () => {
//   it("should remove null and undefined values from object", () => {
//     const obj = { a: 1, b: null, c: undefined, d: { e: 2, f: null } };
//     const expected = { a: 1, d: { e: 2 } };
//     expect(omitNullAndUndefined(obj)).toEqual(expected);
//   });

//   it("should handle empty object", () => {
//     const obj = {};
//     expect(omitNullAndUndefined(obj)).toEqual({});
//   });

//   it("should handle null input", () => {
//     expect(omitNullAndUndefined(null)).toBeNull();
//   });

//   it("should handle undefined input", () => {
//     expect(omitNullAndUndefined(undefined)).toBeUndefined();
//   });

//   // it("should handle arrays with null and undefined values", () => {
//   //   const arr = [1, null, undefined, 2, { a: null, b: 3 }];
//   //   const expected = [1, 2, { b: 3 }];
//   //   expect(omitNullAndUndefined(arr)).toEqual(expected);
//   // });

//   it("should handle nested objects with null and undefined values", () => {
//     const obj = { a: 1, b: { c: null, d: { e: 2 } } };
//     const expected = { a: 1, b: { d: { e: 2 } } };
//     expect(omitNullAndUndefined(obj)).toEqual(expected);
//   });
// });
import { isEmptyObject, omitNullAndUndefined } from "./ObjectUtil";

describe("Utility Functions", () => {
  describe("isEmptyObject", () => {
    it("should return true for an empty object", () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it("should return false for a non-empty object", () => {
      expect(isEmptyObject({ key: "value" })).toBe(false);
    });

    it("should return false for null", () => {
      expect(isEmptyObject(null)).toBe(false);
    });

    it("should return false for arrays", () => {
      expect(isEmptyObject([])).toBe(false);
      expect(isEmptyObject([1, 2, 3])).toBe(false);
    });

    it("should return false for non-object types", () => {
      expect(isEmptyObject(42)).toBe(false);
      expect(isEmptyObject("string")).toBe(false);
      expect(isEmptyObject(undefined)).toBe(false);
    });
  });
});

describe("omitNullAndUndefined", () => {
  it("should remove null and undefined values from an object", () => {
    const input = { a: 1, b: null, c: undefined, d: 2 };
    const expectedOutput = { a: 1, d: 2 };
    const output = omitNullAndUndefined(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should remove null and undefined values from an array", () => {
    const input = [1, null, 2, undefined, 3];
    const expectedOutput = [1, 2, 3];
    const output = omitNullAndUndefined(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should remove empty objects from an array", () => {
    const input = [1, {}, 2];
    const expectedOutput = [1, 2];
    const output = omitNullAndUndefined(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should handle complex nested structures", () => {
    const input = {
      a: 1,
      b: null,
      c: {
        d: undefined,
        e: 2,
        f: {
          g: null,
          h: 3,
        },
        i: {},
      },
      j: [null, { k: undefined, l: 4 }, {}],
    };
    const expectedOutput = {
      a: 1,
      c: {
        e: 2,
        f: { h: 3 },
      },
      j: [{ l: 4 }],
    };
    const output = omitNullAndUndefined(input);
    expect(output).toEqual(expectedOutput);
  });
});
