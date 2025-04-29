import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ShortPagination } from "../components/short-pagination";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/ShortPagination",
  component: ShortPagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onPrevious: {
      table: {
        type: { summary: "function", detail: "() => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    onNext: {
      table: {
        type: { summary: "function", detail: "() => void" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onPrevious: fn(), onNext: fn() },
} satisfies Meta<typeof ShortPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    hasNext: true,
    hasPrevious: true,
  },
  render(args) {
    return (
      <div className="w-[400px]">
        <ShortPagination {...args} />
      </div>
    );
  },
};

export const DisableNext: Story = {
  args: {
    hasNext: false,
    hasPrevious: true,
  },
};

export const DisablePrivious: Story = {
  args: {
    hasNext: true,
    hasPrevious: false,
  },
};

export const DisableAll: Story = {
  args: {
    hasNext: false,
    hasPrevious: false,
  },
};
