import { useRef } from "react";

export function usePersistFn(fn: (...args: any[]) => any) {
  const fnRef = useRef<((...args: any[]) => any) | null>(null);
  fnRef.current = fn;

  const persistFn = useCallback((...args: any[]) => {
    return ref.current(...args);
  }, []);

  return persistFn;
}
