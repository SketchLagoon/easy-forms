// components/ui/calendar.stories.tsx

import { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "../components/ui/calendar";
import { useState } from "react";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date>();

    return (
      <Calendar
        {...args}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    );
  },
};
