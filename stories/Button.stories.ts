import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../components/ui/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button'
  },
};

export const DisabledDefault: Story = {
  args: {
    children: 'Button',
    disabled: true
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button'
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
    disabled: true
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    children: 'Deposit'
  },
};

export const DisabledUnderline: Story = {
  args: {
    variant: 'underline',
    children: 'Deposit',
    disabled: true
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm'
  },
};

export const DefaultSize: Story = {
  args: {
    children: 'Button',
    size: 'default',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg'
  },
};