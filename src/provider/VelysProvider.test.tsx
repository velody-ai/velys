import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { VelysProvider } from "./VelysProvider";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../hooks/useToast";
import { useDisclosure } from "../hooks/useDisclosure";
import { renderHook, act } from "@testing-library/react";
import * as stories from "./VelysProvider.stories";

const { Playground } = composeStories(stories);

function ToastTrigger() {
  const { toast, clear } = useToast();
  return (
    <>
      <button onClick={() => toast({ title: "Hi", duration: 0 })}>fire</button>
      <button onClick={clear}>clear</button>
    </>
  );
}

function ThemeTrigger() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>theme:{theme}</button>;
}

describe("VelysProvider — theme", () => {
  it("exposes theme and toggles it", async () => {
    render(
      <VelysProvider defaultTheme="light">
        <ThemeTrigger />
      </VelysProvider>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("theme:light");
    await userEvent.click(btn);
    expect(btn).toHaveTextContent("theme:dark");
  });
});

describe("VelysProvider — toasts", () => {
  it("shows a toast on demand and clears it", async () => {
    render(
      <VelysProvider>
        <ToastTrigger />
      </VelysProvider>,
    );
    await userEvent.click(screen.getByText("fire"));
    expect(await screen.findByText("Hi")).toBeInTheDocument();
    await userEvent.click(screen.getByText("clear"));
    await waitFor(() => expect(screen.queryByText("Hi")).not.toBeInTheDocument());
  });
});

describe("useTheme / useToast guards", () => {
  it("throw when used outside the provider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(/VelysProvider/);
    expect(() => renderHook(() => useToast())).toThrow(/VelysProvider/);
  });
});

describe("useDisclosure", () => {
  it("toggles open state", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.open).toBe(false);
    act(() => result.current.onOpen());
    expect(result.current.open).toBe(true);
    act(() => result.current.onToggle());
    expect(result.current.open).toBe(false);
  });

  it("respects a controlled open prop", () => {
    const { result } = renderHook(() => useDisclosure({ open: true }));
    expect(result.current.open).toBe(true);
    act(() => result.current.onClose());
    // Controlled — internal state does not change the reported value.
    expect(result.current.open).toBe(true);
  });
});

describe("Provider stories", () => {
  it("renders the Playground story", () => {
    const { container } = render(<Playground />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
