import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";
import * as stories from "./Breadcrumb.stories";

const { Playground } = composeStories(stories);

describe("Breadcrumb", () => {
  it("exposes a Breadcrumb navigation landmark", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    render(<BreadcrumbPage>Current</BreadcrumbPage>);
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("renders separators hidden from assistive tech", () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.firstChild).toHaveAttribute("aria-hidden");
  });
});

describe("Breadcrumb stories", () => {
  it("renders the Playground story", () => {
    const { container } = render(<Playground />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
