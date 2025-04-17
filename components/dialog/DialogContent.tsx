import {
  Dialog as RawDialog,
  useDialogContext,
  UseDialogContext,
} from "@ark-ui/react";
import { cn } from "@/lib/cn";
import {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
} from "react";
import CloseIcon from "@/components/icons/close.svg?react";
import { Button } from "../button";

export interface DialogContentProps {
  title?: ReactNode;
  content: ReactNode;
  className?: string;
  closeNode?: (
    dialogContext: UseDialogContext,
    rawCloseNode: ReactElement,
  ) => ReactElement;
  footerNode?: (options: {
    dialogContext: UseDialogContext;
    cancelNode: ReactElement;
    confirmNode: ReactElement;
  }) => ReactElement;
}
function DialogContentFn(
  {
    title,
    content,
    className,
    closeNode: getCloseNode,
    footerNode: getFooterNode,
  }: DialogContentProps,
  ref: Ref<UseDialogContext>,
) {
  const dialogContext = useDialogContext();
  const close = () => dialogContext.setOpen(false);

  let closeNode = (
    <CloseIcon
      className="absolute right-8 top-9 cursor-pointer"
      onClick={close}
    />
  );
  if (typeof getCloseNode === "function") {
    closeNode = getCloseNode(dialogContext, closeNode);
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

  useImperativeHandle(ref, () => dialogContext, [dialogContext]);

  return (
    <div className={className}>
      <RawDialog.Title
        className={cn("mb-2 text-xl text-primary-text", {
          "display-none": !title,
        })}
      >
        {title}
      </RawDialog.Title>
      {content}
      <div className="mt-4 flex gap-4">
        {typeof getFooterNode === "function" ? (
          getFooterNode({
            dialogContext,
            cancelNode,
            confirmNode,
          })
        ) : (
          <>
            {cancelNode}
            {confirmNode}
          </>
        )}
      </div>
      {closeNode}
    </div>
  );
}

export const DialogContent = forwardRef(DialogContentFn);
