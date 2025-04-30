import { cn } from "@/lib/cn";
import { forwardRef, ReactNode } from "react";
import EmptyIcon from "@/components/icons/empty.svg?react";

const RawTable = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className={cn("w-full overflow-auto bg-white", className)}>
    <table className="w-fit table-fixed" ref={ref} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "text-secondary-text rounded-lg border-b-8 border-white bg-block text-xs leading-none",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("text-sm font-normal leading-4 text-primary-text", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("rounded-lg transition-colors hover:bg-block", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-2 py-2.5 text-left align-middle font-normal", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-2 py-6", className)} {...props} />
));
TableCell.displayName = "TableCell";

export interface Column<T> {
  title: ReactNode;
  dataIndex: (keyof T & string) | (string & {});
  columnClassName?: string;
  headerClassName?: string;
  bodyCellClassName?: string;
  render?: (row: T) => ReactNode;
}
export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  className?: string;
}

export function Table<T extends object>(props: TableProps<T>) {
  const { columns, data, rowKey, className } = props;
  const getRowKey = (row: T) => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    return String(row[rowKey]);
  };
  return (
    <>
      <RawTable className={className}>
        {/* {columns.map((column) => {
          const { columnClassName, dataIndex } = column;
          return <col key={dataIndex} className={columnClassName} />;
        })} */}
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const { title, columnClassName, headerClassName } = column;
              return (
                <TableHead
                  key={column.dataIndex}
                  className={cn(columnClassName, headerClassName)}
                >
                  {title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={getRowKey(row)}>
                {columns.map((column) => {
                  const {
                    dataIndex,
                    render,
                    columnClassName,
                    bodyCellClassName,
                  } = column;
                  return (
                    <TableCell
                      className={cn(columnClassName, bodyCellClassName)}
                      key={column.dataIndex}
                    >
                      {render
                        ? render(row)
                        : (row[dataIndex as keyof T] as ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </RawTable>
      {data.length === 0 && (
        <div className="my-[80px] flex flex-col items-center justify-center">
          <EmptyIcon className="h-[88px] w-[88px]" />
          <div className="text-subTitle mt-[12px] text-[14px] leading-[20px]">
            No Data
          </div>
        </div>
      )}
    </>
  );
}
