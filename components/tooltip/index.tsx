"use client";
import { cn } from "@/lib";
import { isTextNode } from "@/lib/isTextNode";
import { Tooltip, TooltipRootProps, Portal } from "@ark-ui/react";
import { ReactNode } from "react";

interface TooltipProps extends TooltipRootProps {
  content: ReactNode;
  className?: string;
}

const TooltipComponent = (props: TooltipProps) => {
  const { positioning, children, content, className, ...rest } = props;
  return (
    <Tooltip.Root
      openDelay={300}
      closeOnClick={false}
      closeOnPointerDown={false}
      interactive={true}
      positioning={{
        placement: "top",
        ...positioning,
      }}
      {...rest}
    >
      <Tooltip.Trigger asChild={!isTextNode(children)}>
        {children}
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content
            className={cn(
              "max-w-[var(--available-width)] select-text rounded-lg bg-tooltip p-3 text-left text-xs text-tooltip-foreground",
              className,
            )}
          >
            <Tooltip.Arrow
              style={
                {
                  "--arrow-size": "8px",
                  "--arrow-background": "hsl(var(--tooltip))",
                } as React.CSSProperties
              }
            >
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            {content}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
};

export { TooltipComponent as Tooltip };
export type { TooltipProps };
