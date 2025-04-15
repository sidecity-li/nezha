import { Tooltip, TooltipRootProps } from "@ark-ui/react/tooltip";
import { ReactNode } from "react";

const TooltipComponent = (
  props: TooltipRootProps & {
    content: ReactNode;
  }
) => {
  const { positioning, children, content, ...rest } = props;
  return (
    <Tooltip.Root
      openDelay={300}
      closeDelay={300}
      closeOnClick={false}
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
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content className="text-tooltip-foreground bg-tooltip rounded-lg text-xs p-3 max-w-[var(--available-width)]">
          <Tooltip.Arrow
            style={
              {
                "--arrow-size": "8px",
                "--arrow-background": "hsl(var(--tooltip))",
              } as React.CSSProperties
            }
          >
            <Tooltip.ArrowTip/>
          </Tooltip.Arrow>
          {content}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};

export { TooltipComponent as Tooltip };
