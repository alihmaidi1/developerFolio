import { useSyncExternalStore } from "react";
import type { Signal } from "../store/signal";

export const useSignal = <T>(signal: Signal<T>) => {
  return useSyncExternalStore(
    signal.subscribe,
    () => signal.value,
    () => signal.value,
  );
};
