import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../components/tabs";

const Root = Tabs.Root;
// const List = Tabs.List;
// const Trigger = Tabs.Trigger;
// const Content = Tabs.Content;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Tabs",
  component: Root,
  // subcomponents: {
  //   List: List,
  //   Trigger,
  //   Content,
  // },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "基于ARK Tabs扩展而来, 文档地址: https://ark-ui.com/react/docs/components/tabs",
      },
      table: {},
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    defaultValue: "vue",
  },
  render: (args) => {
    return (
      <div className="w-[500px]">
        <Tabs.Root {...args}>
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="react">React Content</Tabs.Content>
          <Tabs.Content value="vue">Vue Content</Tabs.Content>
          <Tabs.Content value="solid">Solid Content</Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: "vue",
    orientation: "vertical",
  },
  render: (args) => {
    return (
      <div className="w-[500px]">
        <Tabs.Root {...args}>
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="react">React Content</Tabs.Content>
          <Tabs.Content value="vue">Vue Content</Tabs.Content>
          <Tabs.Content value="solid">Solid Content</Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },
};
