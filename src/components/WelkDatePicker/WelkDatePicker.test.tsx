import { createRef, useState } from "react";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WelkDatePicker } from "./WelkDatePicker";
import styles from "./WelkDatePicker.module.css";

describe("WelkDatePicker", () => {
  it.each([
    [undefined, "#d62828"],
    ["#2563eb", "#2563eb"],
    ["var(--pen-color)", "var(--pen-color)"],
  ])(
    "uses the supplied pen color (%s), defaulting to red",
    (color, expected) => {
      render(
        <WelkDatePicker
          label="Date"
          defaultValue="2026-10-22"
          circularMarking
          circularMarkingColor={color}
        />,
      );
      expect(
        screen
          .getByRole("button", { name: "Thursday, October 22, 2026" })
          .querySelector("svg"),
      ).toHaveStyle({ color: expected });
    },
  );

  it("uses six uneven circle shapes and keeps each date's shape stable on rerender", () => {
    const { container, rerender } = render(
      <WelkDatePicker label="Date" id="shapes" circularMarking />,
    );
    const shapes = new Set<string | null>();
    for (let day = 1; day <= 31; day++) {
      const value = `2026-10-${String(day).padStart(2, "0")}`;
      const picker = (
        <WelkDatePicker
          label="Date"
          id="shapes"
          circularMarking
          value={value}
        />
      );
      rerender(picker);
      const path = container.querySelector("svg path")!.getAttribute("d");
      shapes.add(path);
      rerender(
        <WelkDatePicker
          label="Date"
          id="shapes"
          circularMarking
          value={value}
        />,
      );
      expect(container.querySelector("svg path")).toHaveAttribute("d", path);
    }
    expect(shapes.size).toBe(6);
  });

  it.each([false, true])(
    "only highlights today when opted in (circularMarking=%s)",
    (circularMarking) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 30, 12));
      try {
        const { rerender } = render(
          <WelkDatePicker
            label="Date"
            value="2026-10-22"
            circularMarking={circularMarking}
          />,
        );
        const today = screen.getByRole("button", {
          name: "Friday, October 30, 2026",
        });
        expect(today).toHaveAttribute("aria-current", "date");
        expect(today).not.toHaveClass(styles.today);
        expect(today.querySelector("svg")).toBeNull();
        rerender(
          <WelkDatePicker
            label="Date"
            value="2026-10-22"
            circularMarking={circularMarking}
            showTodaysDate
          />,
        );
        expect(today).toHaveClass(styles.today);
        rerender(
          <WelkDatePicker
            label="Date"
            value="2026-10-30"
            circularMarking={circularMarking}
            showTodaysDate
          />,
        );
        expect(today).toHaveClass(styles.today);
        expect(today).toHaveAttribute("aria-pressed", "true");
        expect(today.querySelectorAll("svg")).toHaveLength(
          circularMarking ? 1 : 0,
        );
        rerender(
          <WelkDatePicker
            label="Date"
            value="2026-10-30"
            circularMarking={circularMarking}
            showTodaysDate={false}
          />,
        );
        expect(today).not.toHaveClass(styles.today);
        expect(today).toHaveAttribute("aria-current", "date");
        expect(today).toHaveAttribute("aria-pressed", "true");
      } finally {
        vi.useRealTimers();
      }
    },
  );

  it.each([undefined, false, true])(
    "only renders a decorative pen circle when circularMarking is true (%s)",
    (circularMarking) => {
      const { container } = render(
        <WelkDatePicker
          label="Date"
          defaultValue="2026-10-22"
          circularMarking={circularMarking}
        />,
      );
      const selected = screen.getByRole("button", {
        name: "Thursday, October 22, 2026",
        pressed: true,
      });
      expect(container.querySelectorAll("svg")).toHaveLength(
        circularMarking ? 1 : 0,
      );
      if (circularMarking) {
        expect(selected.querySelector("svg")).toHaveAttribute(
          "aria-hidden",
          "true",
        );
        expect(selected.querySelector("svg")).toHaveAttribute(
          "focusable",
          "false",
        );
      }
    },
  );

  it("moves the circle with selection and removes it when cleared or turned off", async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(
      <WelkDatePicker label="Date" defaultValue="2026-10-22" circularMarking />,
    );
    const original = screen.getByRole("button", {
      name: "Thursday, October 22, 2026",
    });
    const next = screen.getByRole("button", {
      name: "Friday, October 23, 2026",
    });
    await user.click(next);
    expect(next).toHaveAttribute("aria-pressed", "true");
    expect(next.querySelector("svg")).toBeInTheDocument();
    expect(original.querySelector("svg")).toBeNull();
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "" } });
    expect(container.querySelector("svg")).toBeNull();
    rerender(
      <WelkDatePicker label="Date" value="2026-10-24" circularMarking />,
    );
    expect(
      screen
        .getByRole("button", { name: "Saturday, October 24, 2026" })
        .querySelector("svg"),
    ).toBeInTheDocument();
    rerender(
      <WelkDatePicker
        label="Date"
        value="2026-10-24"
        circularMarking={false}
      />,
    );
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders all days in a leap month and forwards its input ref and form attributes", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <WelkDatePicker
        label="Adventure date"
        defaultValue="2024-02-10"
        name="date"
        id="adventure"
        required
        ref={ref}
        className="custom"
      />,
    );
    const input = screen.getByLabelText("Adventure date");
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("id", "adventure");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("type", "text");
    expect(input.closest(".custom")).toBeInTheDocument();
    expect(
      within(screen.getByRole("table", { name: "February 2024" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(29);
    expect(
      screen.getByRole("button", { name: "Saturday, February 10, 2024" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("selects dates, notifies and submits an ISO date without submitting on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onSubmit = vi.fn();
    const { container } = render(
      <form onSubmit={onSubmit}>
        <WelkDatePicker
          label="Date"
          defaultValue="2025-01-10"
          name="date"
          onValueChange={onValueChange}
        />
      </form>,
    );
    await user.click(
      screen.getByRole("button", { name: "Friday, January 24, 2025" }),
    );
    expect(screen.getByLabelText("Date")).toHaveValue("2025-01-24");
    expect(onValueChange).toHaveBeenLastCalledWith("2025-01-24");
    expect(new FormData(container.querySelector("form")!).get("date")).toBe(
      "2025-01-24",
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("updates the calendar from the manual top field, including clearing", () => {
    const onValueChange = vi.fn();
    render(
      <WelkDatePicker
        label="Date"
        defaultValue="2025-01-10"
        onValueChange={onValueChange}
      />,
    );
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2026-03-12" },
    });
    expect(
      screen.getByRole("table", { name: "March 2026" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Thursday, March 12, 2026" }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "" } });
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(screen.getByLabelText("Date")).toHaveValue("");
  });

  it("supports controlled selection and external changes", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState("2025-01-10");
      return (
        <WelkDatePicker label="Date" value={value} onValueChange={setValue} />
      );
    }
    const { rerender } = render(<Controlled />);
    await user.click(
      screen.getByRole("button", { name: "Friday, January 24, 2025" }),
    );
    expect(screen.getByLabelText("Date")).toHaveValue("2025-01-24");
    rerender(<WelkDatePicker label="Date" value="2026-05-03" />);
    expect(screen.getByRole("table", { name: "May 2026" })).toBeInTheDocument();
  });

  it("navigates across years without changing the selected date", async () => {
    const user = userEvent.setup();
    render(<WelkDatePicker label="Date" defaultValue="2025-12-15" />);
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(
      screen.getByRole("table", { name: "January 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toHaveValue("2025-12-15");
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(
      screen.getByRole("table", { name: "December 2025" }),
    ).toBeInTheDocument();
  });

  it("supports arrows, Home and End including moving between months", async () => {
    const user = userEvent.setup();
    render(<WelkDatePicker label="Date" defaultValue="2025-01-31" />);
    screen.getByRole("button", { name: "Friday, January 31, 2025" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("button", { name: "Saturday, February 1, 2025" }),
    ).toHaveFocus();
    await user.keyboard("{Home}");
    expect(
      screen.getByRole("button", { name: "Sunday, January 26, 2025" }),
    ).toHaveFocus();
    await user.keyboard("{End}{ArrowDown}");
    expect(
      screen.getByRole("button", { name: "Saturday, February 8, 2025" }),
    ).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByLabelText("Date")).toHaveValue("2025-02-08");
  });

  it("enforces calendar limits and native field validity", async () => {
    const user = userEvent.setup();
    render(
      <WelkDatePicker
        label="Date"
        defaultValue="2025-01-15"
        min="2025-01-10"
        max="2025-01-20"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Thursday, January 9, 2025" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Tuesday, January 21, 2025" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    screen.getByRole("button", { name: "Friday, January 10, 2025" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(
      screen.getByRole("button", { name: "Friday, January 10, 2025" }),
    ).toHaveFocus();
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2025-01-09" },
    });
    expect(screen.getByLabelText("Date")).toBeInvalid();
  });

  it("disables all controls", () => {
    render(<WelkDatePicker label="Date" defaultValue="2025-01-10" disabled />);
    expect(screen.getByLabelText("Date")).toBeDisabled();
    for (const button of screen.getAllByRole("button"))
      expect(button).toBeDisabled();
  });

  it("keeps partial and invalid text editable without changing the calendar", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <WelkDatePicker
        label="Date"
        defaultValue="2025-01-10"
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Date" });
    fireEvent.change(input, { target: { value: "2025-02-" } });
    expect(input).toHaveValue("2025-02-");
    expect(input).toBeInvalid();
    expect(screen.getByRole("alert")).toHaveTextContent("YYYY-MM-DD");
    expect(
      screen.getByRole("table", { name: "January 2025" }),
    ).toBeInTheDocument();
    await user.type(input, "30");
    expect(input).toBeInvalid();
    expect(onValueChange).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, "2024-02-29");
    expect(input).toBeValid();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith("2024-02-29");
    expect(
      screen.getByRole("table", { name: "February 2024" }),
    ).toBeInTheDocument();
  });

  it("resets uncontrolled state with the form", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <WelkDatePicker label="Date" defaultValue="2025-01-10" />
        <button type="reset">Reset</button>
      </form>,
    );
    await user.click(
      screen.getByRole("button", { name: "Friday, January 24, 2025" }),
    );
    await user.click(screen.getByRole("button", { name: "Reset" }));
    await waitFor(() =>
      expect(screen.getByLabelText("Date")).toHaveValue("2025-01-10"),
    );
    expect(
      screen.getByRole("button", { name: "Friday, January 10, 2025" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("handles years below 100 and year navigation boundaries", () => {
    const { rerender } = render(
      <WelkDatePicker label="Date" defaultValue="0001-01-01" />,
    );
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeDisabled();
    rerender(<WelkDatePicker label="Date" value="9999-12-31" />);
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it.each(["2025-02-29", "not-a-date", "0000-01-01"])(
    "reports invalid date props: %s",
    (value) => {
      expect(() =>
        render(<WelkDatePicker label="Date" value={value} />),
      ).toThrow(RangeError);
    },
  );
});
