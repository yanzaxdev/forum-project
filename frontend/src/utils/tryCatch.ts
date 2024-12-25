/**
 * A utility function to handle asynchronous operations with try-catch.
 * It returns a tuple where the first element is a boolean indicating success,
 * and the second element is either the result or the error.
 *
 * @param promise - The promise representing the asynchronous operation.
 * @returns A tuple [boolean, T | Error] where the boolean indicates success,
 *          and T is the result or Error is the caught error.
 */
export async function tryCatch<T>(promise: Promise<T>):
    Promise<[boolean, T | Error]> {
  try {
    // Await the promise and return a tuple with true and the result if
    // successful.
    const result = await promise;
    return [true, result];
  } catch (error) {
    // If an error is caught, return a tuple with false and the error.
    return [false, error as Error];
  }
}