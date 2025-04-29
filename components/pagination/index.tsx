"use client";
import { cn } from "@/lib/cn";
import { Pagination, PaginationRootProps } from "@ark-ui/react";
import ArrowRightIcon from "@/components/icons/arrow-right.svg?react";

export type PaginationProps = PaginationRootProps;

function PaginationComponent(props: PaginationProps) {
  return (
    <Pagination.Root siblingCount={2} {...props} className="flex gap-2">
      <Pagination.Context>
        {(pagination) => {
          const { page: current, totalPages } = pagination;

          return (
            <>
              <Pagination.PrevTrigger
                disabled={current === 1}
                className={cn("mr-[52px] flex items-center gap-1", {
                  "cursor-not-allowed opacity-55": current === 1,
                })}
              >
                <ArrowRightIcon className="text-secondary-text rotate-180" />
                <span className="leading-0 text-secondary-text text-sm">
                  Previous
                </span>
              </Pagination.PrevTrigger>
              {...pagination.pages.map((page, index) => {
                const { type } = page;
                return type === "page" ? (
                  <Pagination.Item
                    key={index}
                    {...page}
                    className={cn(
                      "text-secondary-text leading-0 flex size-6 items-center justify-center rounded-full text-sm",
                      {
                        "bg-green font-medium text-primary-text":
                          page.value === current,
                      },
                    )}
                  >
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis
                    key={index}
                    index={index}
                    className="size-6 text-center font-semibold"
                  >
                    ...
                  </Pagination.Ellipsis>
                );
              })}
              <Pagination.NextTrigger
                className={cn("ml-[52px] flex items-center gap-1", {
                  "cursor-not-allowed opacity-55": current === totalPages,
                })}
                disabled={current === totalPages}
              >
                <span className="leading-0 text-secondary-text text-sm">
                  Next
                </span>
                <ArrowRightIcon className="text-secondary-text" />
              </Pagination.NextTrigger>
            </>
          );
        }}
      </Pagination.Context>
    </Pagination.Root>
  );
}

export { PaginationComponent as Pagination };
