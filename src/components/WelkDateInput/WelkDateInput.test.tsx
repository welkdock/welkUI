import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WelkDateInput } from "./WelkDateInput";
import styles from "../WelkDatePicker/WelkDatePicker.module.css";

describe("WelkDateInput", () => {
  it("forwards showTodaysDate to the popup without requiring circular marking", () => {
    const { container, rerender } = render(<WelkDateInput label="Date" />);
    fireEvent.click(screen.getByRole("combobox"));
    const today = container.querySelector('[aria-current="date"]');
    expect(today).toBeInTheDocument();
    expect(today).not.toHaveClass(styles.today);
    rerender(<WelkDateInput label="Date" showTodaysDate />);
    expect(today).toHaveClass(styles.today);
    rerender(<WelkDateInput label="Date" showTodaysDate={false} />);
    expect(today).not.toHaveClass(styles.today);
  });

  it("forwards circularMarking to the popup and preserves selection and focus behavior", async () => {
    const user = userEvent.setup();
    render(
      <WelkDateInput
        label="Date"
        defaultValue="2026-10-22"
        circularMarking
        circularMarkingColor="#2563eb"
      />,
    );
    const input = screen.getByRole("combobox", { name: "Date" });
    await user.click(input);
    expect(
      screen
        .getByRole("button", {
          name: "Thursday, October 22, 2026",
          pressed: true,
        })
        .querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      screen
        .getByRole("button", { name: "Thursday, October 22, 2026" })
        .querySelector("svg"),
    ).toHaveStyle({ color: "#2563eb" });
    await user.click(
      screen.getByRole("button", { name: "Friday, October 23, 2026" }),
    );
    expect(input).toHaveValue("2026-10-23");
    expect(input).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(input);
    expect(
      screen
        .getByRole("button", {
          name: "Friday, October 23, 2026",
          pressed: true,
        })
        .querySelector("svg"),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("button", { name: "Thursday, October 22, 2026" })
        .querySelector("svg"),
    ).toBeNull();
  });

  it("starts closed and opens the custom calendar from the field or icon", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<WelkDateInput label="Date" defaultValue="2026-10-22" ref={ref} />);
    const input = screen.getByRole("combobox", { name: "Date" });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(input);
    expect(
      screen.getByRole("dialog", { name: "Choose a date" }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(input).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(
      screen.getByRole("table", { name: "October 2026" }),
    ).toBeInTheDocument();
  });

  it("selects a date, closes, restores focus and submits its value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <form>
        <WelkDateInput
          label="Date"
          name="date"
          defaultValue="2026-10-22"
          onValueChange={onValueChange}
        />
      </form>,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(
      screen.getByRole("button", { name: "Friday, October 23, 2026" }),
    );
    expect(screen.getByRole("combobox")).toHaveValue("2026-10-23");
    expect(screen.getByRole("combobox")).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith("2026-10-23");
    expect(new FormData(container.querySelector("form")!).get("date")).toBe(
      "2026-10-23",
    );
  });

  it("dismisses on outside click and when focus leaves", async () => {
    const user = userEvent.setup();
    render(
      <>
        <WelkDateInput label="Date" />
        <button>Outside</button>
      </>,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    screen.getByRole("button", { name: "Outside" }).focus();
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("supports manual typing, limits and required validation", async () => {
    const user = userEvent.setup();
    render(
      <WelkDateInput label="Date" required min="2026-10-10" max="2026-10-28" />,
    );
    const input = screen.getByRole("combobox");
    expect(input).toBeInvalid();
    await user.type(input, "2026-10-22");
    expect(input).toBeValid();
    expect(
      screen.getByRole("table", { name: "October 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Thursday, October 29, 2026" }),
    ).toBeDisabled();
  });

  it("supports ArrowDown into the calendar and keyboard selection", async () => {
    const user = userEvent.setup();
    render(<WelkDateInput label="Date" defaultValue="2026-10-22" />);
    await user.tab();
    await user.keyboard("{ArrowDown}{ArrowRight}{Enter}");
    expect(screen.getByRole("combobox")).toHaveValue("2026-10-23");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports controlled values and stays closed when disabled", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState("2026-10-22");
      return (
        <WelkDateInput label="Date" value={value} onValueChange={setValue} />
      );
    }
    const { rerender } = render(<Controlled />);
    await user.click(screen.getByRole("combobox"));
    await user.click(
      screen.getByRole("button", { name: "Friday, October 23, 2026" }),
    );
    expect(screen.getByRole("combobox")).toHaveValue("2026-10-23");
    rerender(<WelkDateInput label="Date" disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Open calendar" }),
    ).toBeDisabled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
