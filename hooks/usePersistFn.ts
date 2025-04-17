import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePersistFn<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef<T | null>(null);
  fnRef.current = fn;

  const returnedFnRef = useRef<T | null>(null);

  if (!returnedFnRef.current) {
    returnedFnRef.current = ((...args) => fnRef.current!(...args)) as T;
  }

  return returnedFnRef.current;
}
