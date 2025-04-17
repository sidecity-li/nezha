import { Dialog as RawDialog, Portal, UseDialogContext } from "@ark-ui/react";
import { forwardRef, ReactNode, Ref } from "react";
import { isTextNode } from "@/lib/isTextNode";
import { DialogContent, DialogContentProps } from "./DialogContent";
import { cn } from "@/lib/cn";

export interface DialogProps extends DialogContentProps {
  children?: ReactNode;
}

const DialogFn = (props: DialogProps, ref: Ref<UseDialogContext>) => {
  const {
    children,
    title,
    content,
    className,
    closeNode,
    footerNode,
    ...rest
  } = props;

  return (
    <RawDialog.Root lazyMount={true} unmountOnExit={true} {...rest}>
      <RawDialog.Trigger
        asChild={!isTextNode(children) && children !== undefined}
      >
        {children}
      </RawDialog.Trigger>
      <Portal>
        <RawDialog.Backdrop className="bg-dialog/60 fixed inset-0" />
        <RawDialog.Positioner>
          <RawDialog.Content
            className={
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white p-8"
            }
          >
            <DialogContent
              title={title}
              content={content}
              className={className}
              closeNode={closeNode}
              footerNode={footerNode}
              ref={ref}
            />
          </RawDialog.Content>
        </RawDialog.Positioner>
      </Portal>
    </RawDialog.Root>
  );
};

export const Dialog = forwardRef<UseDialogContext, DialogProps>(DialogFn);
