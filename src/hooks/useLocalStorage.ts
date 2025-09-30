import { useState, useEffect } from "react";

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
  loading: boolean;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      } else if (initialValue !== undefined) {
        setValue(initialValue);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setLoading(false);
    }
  }, [key, initialValue]);

  const updateValue = (newValue: T | null) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      setValue(newValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return {
    value,
    setValue: updateValue,
    removeValue,
    loading,
  };
};
