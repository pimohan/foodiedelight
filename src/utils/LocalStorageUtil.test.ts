// LocalStorageUtil.test.ts
import { setItem, getItem, removeItem, clear } from "./LocalStorageUtil";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
} as any);

describe("localStorageUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set an item in localStorage", () => {
    const key = "testKey";
    const value = { name: "test" };

    setItem(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  it("should get an item from localStorage", () => {
    const key = "testKey";
    const value = "test";

    localStorage.setItem(key, JSON.stringify(value));

    const result = getItem<typeof value>(key);
    expect(result).toBeNull();
  });

  it("should return null if item does not exist in localStorage", () => {
    const key = "nonExistentKey";

    const result = getItem(key);
    expect(result).toBeNull();
  });

  it("should remove an item from localStorage", () => {
    const key = "testKey";
    const value = { name: "test" };

    localStorage.setItem(key, JSON.stringify(value));
    removeItem(key);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    expect(localStorage.getItem(key)).toBeUndefined();
  });

  it("should clear all items from localStorage", () => {
    const key1 = "key1";
    const key2 = "key2";
    localStorage.setItem(key1, JSON.stringify({}));
    localStorage.setItem(key2, JSON.stringify({}));

    clear();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(localStorage.getItem(key1)).toBeUndefined();
    expect(localStorage.getItem(key2)).toBeUndefined();
  });
});
