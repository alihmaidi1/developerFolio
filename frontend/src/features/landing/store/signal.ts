export type Listener = () => void;

export interface Signal<T> {
  value: T;
  subscribe: (listener: Listener) => () => void;
}

export const createSignal = <T>(initialValue: T): Signal<T> => {
  let currentValue = initialValue;
  const listeners = new Set<Listener>();

  return {
    get value() {
      return currentValue;
    },
    set value(nextValue: T) {
      if (Object.is(currentValue, nextValue)) return;
      currentValue = nextValue;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
