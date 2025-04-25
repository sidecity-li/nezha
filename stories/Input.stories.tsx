import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import WarningIcon from "@/components/icons/warning.svg?react";
import { Input } from "../components/input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: {
        type: "text",
      },
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["default", "error"],
      },
      description: "default | error ",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "default", "lg"],
      },
      description: "sm | default | lg",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    onClick: {
      table: {
        type: { summary: "function", detail: "() => void" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "请输入",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "请输入",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    value: "8888",
  },
};

export const AllowClear: Story = {
  args: {
    allowClear: true,
    onClear: fn(),
  },
};

export const Prefix: Story = {
  args: {
    allowClear: true,
    prefix: <WarningIcon className="size-8" />,
  },
};

export const Suffix: Story = {
  args: {
    allowClear: true,
    suffix: <WarningIcon className="size-8" />,
  },
};

export const DisabledSuffix: Story = {
  args: {
    allowClear: true,
    disabled: true,
    suffix: <WarningIcon className="size-8" />,
  },
};
