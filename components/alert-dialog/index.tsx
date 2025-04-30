"use client";

import { ReactElement, ReactNode } from "react";
import { Dialog } from "../dialog";
import { DialogProps } from "../dialog";
import WarningIcon from "@/components/icons/warning.svg?react";
import { cn } from "@/lib";

export type AlertDialogProps = Omit<DialogProps, "closeNode" | "content"> & {
  icon?: ReactElement | null;
  description?: ReactNode;
};
export function AlertDialog(props: AlertDialogProps) {
  const { icon: rawIcon, title, description, className, ...rest } = props;

  const defaultIcon = <WarningIcon />;

  const icon = rawIcon !== undefined ? rawIcon : defaultIcon;

  const content = (
    <div className="flex flex-col items-center pb-4 pt-2 text-primary-text">
      {icon && <div className="mt-2">{icon}</div>}
      {title && (
        <div className="mt-2 text-xl font-semibold leading-none">{title}</div>
      )}
      {description && <div className="mt-4 text-sm">{description}</div>}
    </div>
  );

  return (
    <Dialog
      unmountOnExit={false}
      content={() => content}
      closeNode={() => null}
      className={cn("w-[560px]", className)}
      {...rest}
    />
  );
}
