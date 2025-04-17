import { ReactNode } from "react";

export function isTextNode(node: ReactNode) {
  return typeof node === "string" || typeof node === "number";
}
