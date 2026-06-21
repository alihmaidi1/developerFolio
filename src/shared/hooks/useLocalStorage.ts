import { useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Could not read localStorage key "${key}"`, error);
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore =
        typeof value === "function"
          ? (value as (currentValue: T) => T)(storedValue)
          : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Could not write localStorage key "${key}"`, error);
    }
  };

  return [storedValue, setValue];
}
