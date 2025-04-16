import { Tooltip, TooltipRootProps } from "@ark-ui/react/tooltip";
import { ReactNode } from "react";

interface TooltipProps extends TooltipRootProps {
  content: ReactNode;
}

const TooltipComponent = (props: TooltipProps) => {
  const { positioning, children, content, ...rest } = props;
  return (
    <Tooltip.Root
      openDelay={300}
      closeOnClick={false}
      closeOnPointerDown={false}
      positioning={{
        placement: "top",
        ...positioning,
      }}
      {...rest}
    >
      <Tooltip.Trigger
        asChild={typeof children !== "string" && typeof children !== "number"}
      >
        {children}
        <Tooltip.Positioner>
          <Tooltip.Content className="text-left select-text text-tooltip-foreground bg-tooltip rounded-lg text-xs p-3 max-w-[var(--available-width)]">
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
      </Tooltip.Trigger>
    </Tooltip.Root>
  );
};

export { TooltipComponent as Tooltip };
export type { TooltipProps };
