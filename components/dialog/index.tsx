import { Dialog as RawDialog, Portal, UseDialogContext } from "@ark-ui/react";
import { ReactElement, ReactNode, RefObject, useRef } from "react";
import { isTextNode } from "@/lib/isTextNode";
import { cn } from "@/lib/cn";
import CloseIcon from "@/components/icons/close.svg?react";
import { Button } from "../button";
import { UseDialogContextMounter } from "./UseDialogContextMounter";

export interface DialogProps {
  title?: ReactNode;
  content: ReactNode;
  closeNode?: (
    dialogContextRef: RefObject<UseDialogContext | null>,
    rawCloseNode: ReactElement,
  ) => ReactElement;
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

  let closeNode = (
    <CloseIcon
      className="absolute right-8 top-9 cursor-pointer"
      onClick={close}
    />
  );

  if (typeof getCloseNode === "function") {
    closeNode = getCloseNode(dialogContextRef, closeNode);
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
    <div className="mt-4 flex gap-4">
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
        <RawDialog.Backdrop className="bg-dialog/60 fixed inset-0" />
        <RawDialog.Positioner>
          <RawDialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white p-8",
              className,
            )}
          >
            <RawDialog.Title
              className={cn("mb-2 text-xl text-primary-text", {
                "display-none": !title,
              })}
            >
              {title}
            </RawDialog.Title>
            {content}
            {footer}
            {closeNode}
          </RawDialog.Content>
        </RawDialog.Positioner>
      </Portal>
    </RawDialog.Root>
  );
};
