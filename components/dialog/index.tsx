"use client";
import { Dialog as RawDialog, Portal, UseDialogContext } from "@ark-ui/react";
import { ReactElement, ReactNode, RefObject, useRef } from "react";
import { isTextNode } from "@/lib/isTextNode";
import { cn } from "@/lib";
import CloseIcon from "@/components/icons/close.svg?react";
import { Button } from "../button";
import { UseDialogContextMounter } from "./UseDialogContextMounter";

export interface DialogProps extends RawDialog.RootProps {
  title?: ReactNode;
  content: ReactNode;
  closeNode?: (
    dialogContextRef: RefObject<UseDialogContext | null>,
    rawCloseNode: ReactElement,
  ) => ReactElement | null;
  footerNode?: (options: {
    dialogContextRef: RefObject<UseDialogContext | null>;
    cancelNode: ReactElement<HTMLButtonElement>;
    confirmNode: ReactElement<HTMLButtonElement>;
    footerNode: ReactElement<HTMLDivElement>;
  }) => ReactElement | null;
  children?: ReactNode;
  className?: string;
  dialogContextRef?: RefObject<UseDialogContext | null>;
}

export const Dialog = (props: DialogProps) => {
  const {
    children,
    title,
    content,
    className,
    closeNode: getCloseNode,
    footerNode: getFooterNode,
    dialogContextRef: rawDialogContextRef,
    ...rest
  } = props;

  const dialogContextRef = useRef<UseDialogContext>(null);

  const close = () => dialogContextRef?.current?.setOpen(false);

  const defaultCloseNode = (
    <CloseIcon className="right-8 top-9 cursor-pointer" onClick={close} />
  );

  let closeNode;

  if (typeof getCloseNode === "function") {
    closeNode = getCloseNode(dialogContextRef, defaultCloseNode);
  } else {
    closeNode = defaultCloseNode;
  }

  const cancelNode = (
    <Button variant="outline" className="flex-1" onClick={close}>
      Cancel
    </Button>
  );
  const confirmNode = (
    <Button className="flex-1" onClick={close}>
      Confirm
    </Button>
  );

  let footer;
  footer = (
    <div className="flex gap-4">
      {cancelNode}
      {confirmNode}
    </div>
  );
  if (typeof getFooterNode === "function") {
    footer = getFooterNode({
      dialogContextRef,
      cancelNode,
      confirmNode,
      footerNode: footer!,
    });
  }

  return (
    <RawDialog.Root lazyMount={true} unmountOnExit={true} {...rest}>
      <RawDialog.Trigger
        asChild={!isTextNode(children) && children !== undefined}
      >
        {children}
      </RawDialog.Trigger>
      <UseDialogContextMounter
        ref={(dialogContext) => {
          dialogContextRef.current = dialogContext;
          if (rawDialogContextRef) {
            rawDialogContextRef.current = dialogContext;
          }
        }}
      />
      <Portal>
        <RawDialog.Backdrop className="fixed inset-0 bg-dialog/60" />
        <RawDialog.Positioner>
          <RawDialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white px-8",
              className,
            )}
          >
            <div
              className={cn(
                "sticky top-0 flex items-center justify-between bg-white pt-8",
                {
                  "display-none": !title && !closeNode,
                  "mb-2": title || closeNode,
                },
              )}
            >
              <RawDialog.Title
                className={cn("text-xl text-primary-text", {
                  "display-none": !title,
                })}
              >
                {title}
              </RawDialog.Title>
              {closeNode && (
                <div className="flex-none self-end">{closeNode}</div>
              )}
            </div>
            {content}
            <div className="sticky bottom-0 mt-4 bg-white pb-8">{footer}</div>
          </RawDialog.Content>
        </RawDialog.Positioner>
      </Portal>
    </RawDialog.Root>
  );
};
