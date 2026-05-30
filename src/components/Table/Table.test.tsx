import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import * as stories from "./Table.stories";

const { Playground, Striped } = composeStories(stories);

function Basic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Inter</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("renders a table element with rows and cells", () => {
    render(<Basic />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Inter" })).toBeInTheDocument();
  });

  it("sets scope=col on header cells", () => {
    render(<Basic />);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("scope", "col");
  });

  it("merges a custom className onto the table", () => {
    render(
      <Table className="my-class">
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table")).toHaveClass("my-class");
  });
});

describe("Table stories", () => {
  it.each([
    ["Playground", Playground],
    ["Striped", Striped],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
