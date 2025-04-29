"use client";
import CaretRightIcon from "@/components/icons/arrow-right.svg?react";
import { cn } from "@/lib/cn";

export interface ShortPaginationProps {
  hasNext: boolean;
  hasPrevious: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}
export function ShortPagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: ShortPaginationProps) {
  const paginationItemClassName =
    "size-10 rounded-full border border-border flex items-center justify-center";
  return (
    <div className="flex justify-center gap-8">
      <button
        className={cn(
          paginationItemClassName,
          "rotate-180",
          hasPrevious === true
            ? "pointer-events-auto cursor-pointer text-primary-text"
            : "pointer-events-none cursor-not-allowed text-hint",
        )}
        onClick={onPrevious}
      >
        <CaretRightIcon className="size-6" />
      </button>
      <button
        className={cn(
          paginationItemClassName,
          hasNext === true
            ? "pointer-events-auto cursor-pointer text-primary-text"
            : "pointer-events-none cursor-not-allowed text-hint",
        )}
        onClick={onNext}
      >
        <CaretRightIcon className="size-6" />
      </button>
    </div>
  );
}
