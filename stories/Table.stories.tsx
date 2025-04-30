import type { Meta, StoryObj } from "@storybook/react";

import { Column, Table } from "../components/table";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = {
  id: string;
  name: string;
  age: number;
  role: string;
};

const columns: Column<Person>[] = [
  {
    title: "编号",
    dataIndex: "id",
    // columnClassName: "w-[280px]",
  },
  {
    title: "名字",
    dataIndex: "name",
    // columnClassName: "w-[280px]",
  },
  {
    title: "年纪",
    dataIndex: "age",
    // columnClassName: "text-right w-[280px]",
  },
  {
    title: "角色",
    dataIndex: "role",
    // columnClassName: "text-right w-[280px]",
    render(row) {
      const { role } = row;
      return (
        <>
          我是一名<span className="text-red">{role}</span>
        </>
      );
    },
  },
];

const data: Person[] = [
  {
    id: "1",
    name: "hhh",
    age: 14,
    role: "teacher",
  },
  {
    id: "2",
    name: "hhh2",
    age: 14,
    role: "teacher",
  },
  {
    id: "3",
    name: "hhh3",
    age: 14,
    role: "teacher",
  },
  {
    id: "4",
    name: "hhh4",
    age: 14,
    role: "teacher",
  },
  {
    id: "5",
    name: "hhh5",
    age: 14,
    role: "teacher",
  },
  {
    id: "6",
    name: "hhh6",
    age: 14,
    role: "teacher",
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    columns,
    data,
    rowKey: "id",
  },
  render(args) {
    return (
      <div className="w-[800px]">
        <Table<Person> {...args} />
      </div>
    );
  },
};

export const FixedWidth: Story = {
  args: {
    columns: columns.map((column) => ({
      ...column,
      columnClassName: `${column.columnClassName} w-[300px]`,
    })),
    data,
    rowKey: "id",
  },
  render(args) {
    return (
      <div className="w-[800px]">
        <Table<Person>
          {...args}
          className="[&>table]:w-fit [&>table]:table-fixed"
        />
      </div>
    );
  },
};
