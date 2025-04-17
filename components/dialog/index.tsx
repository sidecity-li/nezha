import { Dialog as RawDialog } from "radix-ui";
import {
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import { isTextNode } from "@/lib/isTextNode";
import { cn } from "@/lib/cn";
import CloseIcon from "@/components/icons/close.svg?react";

export interface DialogProps {
  children?: ReactNode;
  title?: ReactNode;
  content: ReactNode;
  className?: string;
  closeNode: (close: () => void, rawCloseNode: ReactElement) => ReactElement;
}

export interface DialogHandle {
  close: () => void;
  open: () => void;
}

export const Dialog = (props: DialogProps, ref: Ref<DialogHandle>) => {
  const {
    children,
    title,
    content,
    className,
    closeNode: getCloseNode,
  } = props;
  const closeHandle = useRef<HTMLButtonElement>(null);
  const triggerHandle = useRef<HTMLButtonElement>(null);

  const closeFn = () => closeHandle.current?.click();
  const openFn = () => triggerHandle.current?.click();

  let closeNode = <CloseIcon className="cursor-pointer" />;
  if (typeof getCloseNode === "function") {
    closeNode = getCloseNode(closeFn, closeNode);
  }

  useImperativeHandle(ref, () => {
    return {
      close: closeFn,
      open: openFn,
    };
  }, []);

  return (
    <RawDialog.Root>
      <RawDialog.Trigger ref={triggerHandle} asChild={!isTextNode(children)}>
        {children}
      </RawDialog.Trigger>
      <RawDialog.Portal>
        <RawDialog.Overlay className="bg-dialog/60 fixed inset-0" />
        <RawDialog.Content
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white p-8",
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
          {/* <RawDialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </RawDialog.Description> */}
          {content}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <RawDialog.Close asChild>
              <button className="Button green">Save changes</button>
            </RawDialog.Close>
          </div>
          <RawDialog.Close
            asChild={!isTextNode(closeNode)}
            ref={closeHandle}
            className="cursor-pointer"
          >
            {closeNode}
          </RawDialog.Close>
        </RawDialog.Content>
      </RawDialog.Portal>
    </RawDialog.Root>
  );
};
