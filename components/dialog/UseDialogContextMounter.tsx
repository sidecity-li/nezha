import { UseDialogContext, useDialogContext } from "@ark-ui/react";
import { forwardRef, Ref, useImperativeHandle } from "react";

const UseDialogContextMounterFn = (_: object, ref: Ref<UseDialogContext>) => {
  const dialogContext = useDialogContext();
  useImperativeHandle(ref, () => dialogContext, [dialogContext]);
  return null;
};

export const UseDialogContextMounter = forwardRef(UseDialogContextMounterFn);
