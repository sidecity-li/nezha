import { forwardRef, ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/cn";
import ClearIcon from "@/components/icons/clear.svg?react";

const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & {
    variant?: "default" | "error";
    allowClear?: boolean;
    onClear?: () => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
  }
>(
  (
    {
      className,
      variant = "default",
      prefix,
      suffix,
      allowClear = false,
      onClear,
      disabled,
      ...props
    },
    ref,
  ) => {
    let clearNode;

    if (allowClear) {
      clearNode = (
        <ClearIcon
          className={cn("size-5 flex-none", {
            "cursor-pointer": !disabled,
          })}
          onClick={onClear}
        />
      );
    }

    return (
      <div
        className={cn(
          "flex h-14 w-full items-center gap-3 rounded-lg border border-border px-4 py-3 focus-within:border-primary-action",
          {
            "bg-block cursor-not-allowed opacity-60": disabled,
          },
          {
            "border-red focus-within:border-red": variant === "error",
          },
          className,
        )}
      >
        {prefix && <span className="flex-none">{prefix}</span>}
        <input
          className={cn(
            "placeholder:text-hint h-full min-w-0 flex-1 border-none text-base text-primary-text outline-none placeholder:text-base disabled:cursor-not-allowed",
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {clearNode}
        {suffix && <span className="flex-none">{suffix}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
