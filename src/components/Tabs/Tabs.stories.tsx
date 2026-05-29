import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const Demo = ({ variant }: { variant: "underline" | "pill" }) => (
  <Tabs defaultValue="overview" variant={variant}>
    <TabList>
      <Tab value="overview">Overview</Tab>
      <Tab value="activity">Activity</Tab>
      <Tab value="settings">Settings</Tab>
      <Tab value="disabled" disabled>Disabled</Tab>
    </TabList>
    <div style={{ paddingTop: 16 }}>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="activity">Activity content</TabPanel>
      <TabPanel value="settings">Settings content</TabPanel>
    </div>
  </Tabs>
);

export const Underline: Story = { render: () => <Demo variant="underline" /> };
export const Pill: Story = { render: () => <Demo variant="pill" /> };
