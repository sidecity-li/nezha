import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../components/tooltip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Tooltip",
  // decorators:[() => ({
  //   template: '<div style="margin: 3em;"><story/></div>'
  // })],
  component: Tooltip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: '基于ARK Tooltip扩展而来, 文档地址: https://ark-ui.com/react/docs/components/tooltip',
      }
    }
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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;



// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "hover me",
    content:
      "I am a toolti你啊和公安您改的难打卡减肥啊喂；金拿单啊快递费那肯定是封口机啊剪短发安康份咖喱饭难分卡上给你讲啊可能放安个；安高考啦里那点女篮过来啊过年啦过年啦个哪里啊难啦过年啦个那你看啊那个那个那个了那管理规范呢 发你!",
  },
};
