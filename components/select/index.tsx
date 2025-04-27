"use client";

import { Portal } from "@ark-ui/react/portal";
import {
  Select,
  SelectRootProps as RawSelectRootProps,
  createListCollection,
  useSelectContext,
  SelectValueTextProps,
} from "@ark-ui/react";
import { Input } from "../input";
import CaretDownIcon from "@/components/icons/caret-down.svg?react";
import SelectedIcon from "@/components/icons/selected.svg?react";
import {
  cloneElement,
  CSSProperties,
  forwardRef,
  ReactNode,
  Ref,
  useState,
} from "react";
import { cn } from "@/lib";

export interface SelectRootProps<T>
  extends Omit<RawSelectRootProps<T>, "collection" | "onChange" | "value"> {
  variant?: "default" | "error";
  value?: string | string[] | undefined;
  onChange?: (value: string | string[] | undefined) => void;
  onBlur: () => void;
  placeholder?: string;
  itemToValue?: (item: T) => string;
  itemToLabel?: (item: T) => ReactNode;
  filter?: (item: T, keyword: string) => boolean;
  isItemDisabled?: (item: T) => boolean;
  itemToString?: (item: T) => string;
  items: T[];
  size?: "default" | "large";
  getSelectionNode?: (items: T[]) => ReactNode;
}

function SelectValueText<T>(
  props: SelectValueTextProps & {
    itemToLabel?: Exclude<SelectRootProps<T>["itemToLabel"], undefined>;
    getSelectionNode?: Exclude<
      SelectRootProps<T>["getSelectionNode"],
      undefined
    >;
  },
) {
  const ctx = useSelectContext();
  const { itemToLabel, getSelectionNode, ...rest } = props;
  const { multiple, selectedItems, collection } = ctx;
  const showPlaceholder = selectedItems.length === 0;

  const ValueNode = (
    <Select.ValueText
      className={cn(
        "flex min-w-0 flex-1 justify-start",
        showPlaceholder ? "text-hint" : "text-primary-text",
      )}
      {...rest}
    />
  );
  if (!multiple || (!getSelectionNode && !itemToLabel)) {
    return ValueNode;
  }

  return cloneElement(ValueNode, {
    children: getSelectionNode ? (
      getSelectionNode(selectedItems)
    ) : (
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {selectedItems.map((item) =>
          itemToLabel ? itemToLabel(item) : collection.stringifyItem(item),
        )}
      </div>
    ),
  });
}

function SelectComponent<T>(
  props: SelectRootProps<T>,
  ref: Ref<HTMLSelectElement>,
) {
  const {
    variant = "default",
    placeholder,
    value,
    onChange,
    onBlur,
    multiple,
    itemToValue,
    itemToLabel,
    itemToString,
    filter,
    isItemDisabled,
    items,
    size = "default",
    getSelectionNode,
    ...restProps
  } = props;
  const [keyword, setKeyword] = useState("");
  const triggerHeight = size === "default" ? "40px" : "56px";

  const collection = createListCollection({
    items: items,
    itemToValue,
    itemToString,
    isItemDisabled,
  });

  const defaultFilter = (item: T, keyword: string) => {
    const itemStr = collection.stringifyItem(item) ?? "";
    return itemStr.includes(keyword);
  };

  const options = items.filter((item) =>
    (filter ?? defaultFilter)(item, keyword),
  );

  const onValueChange = (details: Select.ValueChangeDetails<T>) => {
    const { value } = details;
    onChange?.(multiple ? value : value[0]);
  };

  console.log(value);

  return (
    <Select.Root
      collection={collection}
      multiple={multiple}
      closeOnSelect={!multiple}
      onValueChange={onValueChange}
      value={typeof value === "string" ? [value] : value}
      style={
        {
          "--reference-height": triggerHeight,
        } as CSSProperties
      }
      {...restProps}
    >
      <Select.Control>
        <Select.Trigger
          className={cn(
            "flex h-[var(--reference-height)] w-full items-center gap-2 rounded-lg border border-border px-4 py-3 focus:border-primary-action",
            {
              "border-red focus:border-red": variant === "error",
            },
            {
              "cursor-not-allowed bg-block opacity-60": restProps.disabled,
            },
          )}
          onBlur={onBlur}
        >
          <SelectValueText
            placeholder={placeholder}
            itemToLabel={itemToLabel}
            getSelectionNode={getSelectionNode}
          />
          <Select.Indicator className="flex-none">
            <CaretDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner
          className="w-[var(--reference-width)]"
          style={
            {
              "--reference-height": triggerHeight,
            } as CSSProperties
          }
        >
          <Select.Content className="rounded-lg border border-border bg-white pb-2 pt-3">
            {Boolean(filter) && (
              <div className="px-4 pt-4">
                <Input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </div>
            )}
            {options.map((item) => {
              const value = collection.getItemValue(item);
              return (
                <Select.Item
                  key={value}
                  item={item}
                  className="flex h-[var(--reference-height)] items-center px-4"
                >
                  <Select.ItemText className="min-w-0 flex-1 gap-2">
                    {itemToLabel
                      ? itemToLabel(item)
                      : collection.stringifyItem(item)}
                  </Select.ItemText>
                  <Select.ItemIndicator className="flex-none">
                    <SelectedIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect ref={ref} value={value} multiple={multiple} />
    </Select.Root>
  );
}

export { SelectComponent as Select };
