import { useEffect } from "react";

/**
 * A custom hook that provides debounced effect execution.
 *
 * @param effect - The function to be executed after the specified delay.
 * @param delay - The time (in milliseconds) to wait before executing the effect function.
 * @param deps - The dependencies array that determines when the effect should re-run.
 */
export const useDebouncedEffect = (
  effect: () => void, // The effect function to run after the delay
  delay: number, // Delay time in milliseconds before executing the effect
  deps: any[] // Dependencies array that controls when the effect should re-run
) => {
  useEffect(() => {
    // Create a timeout handler that will execute the effect function after the specified delay
    const handler = setTimeout(() => {
      effect();
    }, delay);

    // Cleanup function to clear the timeout if dependencies change before the delay is over
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]); // Re-run effect when dependencies change
};
