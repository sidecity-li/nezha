import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ComponentType,
  forwardRef,
  ForwardRefExoticComponent,
  Ref,
} from "react";

export function generateComponentFn<
  T extends ComponentType,
  U extends ComponentProps<T>
>(Component: T, getProps: (props: U) => ComponentProps<T>) {
  return (newProps: U) => {
    // TODO 这个any需要去掉
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = getProps(newProps) as any;
    return <Component {...props} />;
  };
}

export function generateComponentRefFn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ForwardRefExoticComponent<any>,
  U extends ComponentPropsWithRef<T>
>(Component: T, getProps: (props: U) => ComponentPropsWithoutRef<T>) {
  return forwardRef((newProps: U, ref: Ref<T>) => {
    // TODO 这个any需要去掉
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = getProps(newProps) as any;
    return <Component {...props} ref={ref} />;
  }) as U;
}
