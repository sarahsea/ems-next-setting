import TextCommonButton from "@/shared/ui/components/TestCommonButton";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof TextCommonButton> = {
  title: "Example/TextCommonButton",
  component: TextCommonButton,
  tags: ["autodocs"],
  args: { children: "test" },
};

export default meta;

type Story = StoryObj<typeof TextCommonButton>;

export const Primary: Story = {
  args: {
    variant: "contained",
    color: "primary",
  },
};
export const Secondary: Story = {
  args: {
    variant: "outlined",
    color: "secondary",
  },
};
export const Error: Story = {
  args: {
    // variant: "text",
    color: "error",
  },
};
