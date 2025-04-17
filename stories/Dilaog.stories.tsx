/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@/components/dialog";
import { useRef } from "react";
import { UseDialogContext } from "@ark-ui/react";
import { Button } from "@/components/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "基于ARK Dialog扩展而来, 文档地址: https://ark-ui.com/react/docs/components/dialog",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: {
        type: "text",
      },
      description: "Tooltip text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    content: {
      control: {
        type: "text",
      },
      description: "Tooltip content",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "点击我",
    title: "对话框标题",
    className: "w-[500px] h-[200px]",
    content: (
      <>
        <div className="h-[150px] py-[150px] text-center">对话框内容</div>
        77
      </>
    ),
  },
};

export const Command: Story = {
  args: {},
  render: () => {
    const CommandComponent = () => {
      const ref = useRef<UseDialogContext | null>(null);
      const onClick = () => {
        ref.current?.setOpen?.(true);
      };
      return (
        <div>
          <Button onClick={onClick}>点我</Button>
          <Dialog
            title="对话框标题"
            className="w-[500px]"
            content="对话框内容"
            dialogContextRef={ref}
          ></Dialog>
        </div>
      );
    };
    return <CommandComponent />;
  },
};
