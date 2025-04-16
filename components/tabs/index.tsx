import { cn } from "@/lib/utils";
import { Tabs as RawTabs } from "@ark-ui/react/tabs";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const Root = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RawTabs.Root>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RawTabs.Root
      className={cn(
        "data-[orientation=vertical]:flex data-[orientation=vertical]:flex-row",
        className,
      )}
      {...rest}
      ref={ref}
    />
  );
});

const List = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RawTabs.List>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RawTabs.List
      className={cn(
        "relative flex gap-8 border-basic-line data-[orientation=vertical]:flex-none data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r",
        className,
      )}
      {...rest}
      ref={ref}
    />
  );
});

const Trigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RawTabs.Trigger>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RawTabs.Trigger
      {...rest}
      ref={ref}
      className={cn(
        "flex text-base font-semibold text-teriary-text aria-[selected=true]:text-primary-text data-[orientation=horizontal]:py-4 data-[orientation=vertical]:px-4",
        className,
      )}
    ></RawTabs.Trigger>
  );
});

const Indicator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RawTabs.Indicator>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RawTabs.Indicator
      {...rest}
      ref={ref}
      className={cn(
        "bg-basic-link data-[orientation=horizontal]:top-[calc(var(--height)-3px)] data-[orientation=vertical]:left-[calc(var(--width)-3px)] data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:h-[var(--height)] data-[orientation=horizontal]:w-[var(--width)] data-[orientation=vertical]:w-[3px]",
        className,
      )}
    ></RawTabs.Indicator>
  );
});

const Content = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RawTabs.Content>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <RawTabs.Content
      {...rest}
      ref={ref}
      className={cn(
        "data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:flex-1 data-[orientation=horizontal]:py-4 data-[orientation=vertical]:px-4",
        className,
      )}
    />
  );
});

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
  Indicator,
};

export const InitialTab = () => (
  <div className="w-[500px]">
    <Tabs.Root className="w-full" defaultValue="vue">
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="react">React Content</Tabs.Content>
      <Tabs.Content value="vue">Vue Content</Tabs.Content>
      <Tabs.Content value="solid">Solid Content</Tabs.Content>
    </Tabs.Root>
    <br />
    <br />
    <Tabs.Root className="w-full" defaultValue="vue" orientation="vertical">
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="react">React Content</Tabs.Content>
      <Tabs.Content value="vue">Vue Content</Tabs.Content>
      <Tabs.Content value="solid">Solid Content</Tabs.Content>
    </Tabs.Root>
  </div>
);
