import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Tabs, TabList, Tab, TabPanel } from "./Tabs";
import * as stories from "./Tabs.stories";

const { Underline, Pill } = composeStories(stories);

function renderTabs(props?: { onValueChange?: (v: string) => void }) {
  return render(
    <Tabs defaultValue="overview" onValueChange={props?.onValueChange}>
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="activity">Activity content</TabPanel>
      <TabPanel value="settings">Settings content</TabPanel>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders tablist, tabs, and only the active panel", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
    expect(screen.queryByText("Activity content")).not.toBeInTheDocument();
  });

  it("marks the default tab as selected", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "false");
  });

  it("switches the active panel when another tab is clicked", async () => {
    renderTabs();
    await userEvent.click(screen.getByRole("tab", { name: "Activity" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Activity content");
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("Overview content")).not.toBeInTheDocument();
  });

  it("calls onValueChange with the selected value", async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    await userEvent.click(screen.getByRole("tab", { name: "Settings" }));
    expect(onValueChange).toHaveBeenCalledWith("settings");
  });

  it("respects controlled value (does not switch internally)", async () => {
    const onValueChange = vi.fn();
    render(
      <Tabs value="overview" onValueChange={onValueChange}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
        </TabList>
        <TabPanel value="overview">Overview content</TabPanel>
        <TabPanel value="activity">Activity content</TabPanel>
      </Tabs>,
    );
    await userEvent.click(screen.getByRole("tab", { name: "Activity" }));
    expect(onValueChange).toHaveBeenCalledWith("activity");
    // Still controlled to "overview" since the value prop did not change.
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
  });
});

describe("Tabs stories", () => {
  it.each([
    ["Underline", Underline],
    ["Pill", Pill],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Underline />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
