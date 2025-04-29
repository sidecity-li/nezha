import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Pagination } from "../components/pagination";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        page={currentPage}
        count={500}
        pageSize={20}
        onPageChange={(details) => {
          setCurrentPage(details.page);
          alert(JSON.stringify(details));
        }}
      />
    );
  },
};

// export const DisableNext: Story = {
//   args: {
//     hasNext: false,
//     hasPrevious: true,
//   },
// };

// export const DisablePrivious: Story = {
//   args: {
//     hasNext: true,
//     hasPrevious: false,
//   },
// };

// export const DisableAll: Story = {
//   args: {
//     hasNext: false,
//     hasPrevious: false,
//   },
// };
