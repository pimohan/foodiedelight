// /**
//  * Checks if an object is empty (i.e., has no own properties).
//  *
//  * @param obj - The object to check.
//  * @returns True if the object is empty and not null; otherwise, false.
//  */
// export const isEmptyObject = (obj: any): boolean => {
//   return (
//     typeof obj === "object" && obj !== null && Object.keys(obj).length === 0
//   );
// };

// /**
//  * Recursively removes properties with null or undefined values from an object or array.
//  *
//  * @param obj - The object or array from which null or undefined values will be removed.
//  * @returns A new object or array with null and undefined values removed.
//  */
// export const omitNullAndUndefined = (obj: any): any => {
//   // If the input is not an object or is null, return it as is
//   if (typeof obj !== "object" || obj === null) return obj;

//   // Recursively process each property of the object
//   return Object.keys(obj).reduce(
//     (acc: any, key) => {
//       const value = obj[key];

//       if (value !== null && value !== undefined) {
//         if (Array.isArray(value)) {
//           // Process each element in the array
//           acc[key] = value
//             .map(omitNullAndUndefined)
//             .filter(
//               (item) =>
//                 item !== null && item !== undefined && !isEmptyObject(item)
//             );
//         } else if (typeof value === "object") {
//           // Recursively clean the nested object
//           const cleanedValue = omitNullAndUndefined(value);
//           if (!isEmptyObject(cleanedValue)) {
//             acc[key] = cleanedValue;
//           }
//         } else {
//           // Keep the non-null, non-undefined value
//           acc[key] = value;
//         }
//       }
//       return acc;
//     },
//     Array.isArray(obj) ? [] : {}
//   );
// };
/**
 * Checks if an object is empty (i.e., has no own properties).
 *
 * @param obj - The object to check.
 * @returns True if the object is empty and not null; otherwise, false.
 */
export const isEmptyObject = (obj: any): boolean => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0
  );
};

/**
 * Recursively removes properties with null or undefined values from an object or array.
 *
 * @param obj - The object or array from which null or undefined values will be removed.
 * @returns A new object or array with null and undefined values removed.
 */
export const omitNullAndUndefined = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj
      .map(omitNullAndUndefined)
      .filter(
        (item) => item !== null && item !== undefined && !isEmptyObject(item)
      );
  }

  return Object.keys(obj).reduce((acc: any, key) => {
    const value = obj[key];

    if (value !== null && value !== undefined) {
      const cleanedValue = omitNullAndUndefined(value);
      if (!isEmptyObject(cleanedValue)) {
        acc[key] = cleanedValue;
      }
    }

    return acc;
  }, {});
};
