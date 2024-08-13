import { renderHook } from "@testing-library/react";
import { useDebouncedEffect } from "./Debounce";

describe("useDebouncedEffect", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should call effect after specified delay", () => {
    const effect = jest.fn();
    const delay = 500;
    const deps = [1];

    renderHook(() => useDebouncedEffect(effect, delay, deps));

    // Fast-forward time by the delay amount
    jest.advanceTimersByTime(delay);

    // Verify the effect function was called
    expect(effect).toHaveBeenCalledTimes(1);
  });

  test("should reset timer if dependencies change", () => {
    const effect = jest.fn();
    const delay = 500;
    const { rerender } = renderHook(
      ({ deps }) => useDebouncedEffect(effect, delay, deps),
      { initialProps: { deps: [1] } }
    );

    // Fast-forward time by half the delay amount
    jest.advanceTimersByTime(delay / 2);

    // Change dependencies
    rerender({ deps: [2] });

    // Fast-forward time by the delay amount
    jest.advanceTimersByTime(delay);

    // Verify the effect function was called only once after the dependency change
    expect(effect).toHaveBeenCalledTimes(1);
  });

  test("should cleanup timer on unmount", () => {
    const effect = jest.fn();
    const delay = 500;
    const { unmount } = renderHook(() =>
      useDebouncedEffect(effect, delay, [1])
    );

    // Fast-forward time by half the delay amount
    jest.advanceTimersByTime(delay / 2);

    // Unmount the hook
    unmount();

    // Fast-forward time by the delay amount
    jest.advanceTimersByTime(delay);

    // Verify the effect function was not called after unmount
    expect(effect).not.toHaveBeenCalled();
  });
});
