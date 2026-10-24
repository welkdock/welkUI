import { act, fireEvent, render, screen, within } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { VariantGallery } from "../../examples/react-vite/src/VariantGallery";
import { componentGuides } from "../../examples/react-vite/src/componentGuides";
import type { ComponentName } from "../../examples/react-vite/src/catalogue";

const expectedTitles = {
  WelkAccordion: ["Vertical", "Horizontal", "Nested", "Outside dismissal"],
  WelkAttachment: [
    "Multiple files",
    "Single image",
    "Count, size and type limits",
    "Disabled",
  ],
  WelkAvatar: [
    "user",
    "male-user",
    "female-user",
    "male-admin",
    "female-admin",
    "Size sm",
    "Size md",
    "Size lg",
    "Custom image",
    "Custom icon and background",
  ],
  WelkBadge: [
    "default",
    "info",
    "success",
    "warning",
    "error",
    "Size sm",
    "Size md",
    "Size lg",
  ],
  WelkBreadCrumbs: ["Default separator", "Custom separator", "Text-only trail"],
  WelkButton: [
    "primary",
    "secondary",
    "ghost",
    "info",
    "success",
    "warning",
    "error",
    "Size sm",
    "Size md",
    "Size lg",
    "Disabled",
  ],
  WelkCard: ["Hover growth", "No growth", "With icon", "Disabled"],
  WelkCheckBox: ["Unchecked", "Checked", "Indeterminate", "Disabled states"],
  WelkDateInput: ["Empty", "Preselected", "Bounded range", "Disabled"],
  WelkDatePicker: ["Empty", "Preselected", "Bounded range", "Disabled"],
  WelkDialog: ["alert", "info", "warning", "error", "success", "Confirmation"],
  WelkDivider: ["plain", "dotted", "dashed", "Vertical", "Thick line"],
  WelkDrawer: ["left", "right", "top", "bottom"],
  WelkDropDown: ["Native select", "Searchable", "Preselected", "Disabled"],
  WelkIconButton: ["Icon only", "Icon and text", "Disabled"],
  WelkImage: ["Local asset", "Network mode", "Load failure and fallback"],
  WelkInput: [
    "text",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "End action",
    "Disabled",
    "Read only",
  ],
  WelkMenu: ["Flat", "Nested", "Collapsible"],
  WelkOTPInput: [
    "Six digits",
    "Four digits",
    "Controlled feedback",
    "Disabled",
  ],
  WelkQRCode: [
    "Website URL",
    "Long URL",
    "Invalid URL",
    "Card",
    "Original square modules",
  ],
  WelkRadio: ["Shared-name options", "Disabled checked"],
  WelkRadioGroup: [
    "Uncontrolled selection",
    "Controlled feedback",
    "Disabled group",
  ],
  WelkRangeSlider: [
    "Live numeric value",
    "Custom bounds and steps",
    "Disabled",
  ],
  WelkSnackBar: [
    "default",
    "info",
    "success",
    "warning",
    "error",
    "top-left",
    "top-middle",
    "top-right",
    "bottom-left",
    "bottom-middle",
    "bottom-right",
    "Automatic dismissal",
  ],
  WelkSticker: [
    "Default outline",
    "Colored thick outline",
    "Hover elevation",
    "No outline",
    "Fallback artwork",
  ],
  WelkStickerCard: ["Hover growth", "No growth", "With icon", "Disabled"],
  WelkSwitch: ["Off", "On", "Controlled feedback", "Disabled states"],
  WelkTabs: [
    "With background",
    "With background vertical",
    "Horizontal",
    "Vertical",
    "Disabled tab",
  ],
  WelkTimePicker: ["Hours and minutes", "With seconds", "Empty", "Disabled"],
  WelkTooltip: ["bubble", "speech", "speach"],
} satisfies Record<ComponentName, readonly string[]>;

const prototype = HTMLDialogElement.prototype;
const originalShowModal = Object.getOwnPropertyDescriptor(
  prototype,
  "showModal",
);
const originalClose = Object.getOwnPropertyDescriptor(prototype, "close");
beforeAll(() => {
  Object.defineProperties(prototype, {
    showModal: {
      configurable: true,
      value() {
        this.open = true;
      },
    },
    close: {
      configurable: true,
      value() {
        if (!this.open) return;
        this.open = false;
        this.dispatchEvent(new Event("close"));
      },
    },
  });
});
afterAll(() => {
  for (const [name, descriptor] of [
    ["showModal", originalShowModal],
    ["close", originalClose],
  ] as const) {
    if (descriptor) Object.defineProperty(prototype, name, descriptor);
    else Reflect.deleteProperty(prototype, name);
  }
});
afterEach(() => vi.useRealTimers());

describe("Visual variant galleries", () => {
  it("previews the default network URL, reports load errors, and recovers with another URL", () => {
    render(<VariantGallery name="WelkImage" />);
    const field = screen.getByRole("textbox", { name: "Image URL" });
    const defaultUrl =
      "https://img.magnific.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg";
    expect(field).toHaveValue(defaultUrl);
    const preview = () =>
      screen.getByRole("img", { name: "Network image preview" });
    expect(preview()).toHaveAttribute("src", defaultUrl);
    fireEvent.change(field, {
      target: { value: "https://example.com/missing.jpg" },
    });
    expect(preview()).toHaveAttribute("src", "https://example.com/missing.jpg");
    fireEvent.error(preview());
    expect(screen.getByText("Unable to load image")).toBeInTheDocument();
    expect(preview()).not.toHaveAttribute(
      "src",
      "https://example.com/missing.jpg",
    );
    fireEvent.change(field, {
      target: { value: "https://example.com/working.jpg" },
    });
    expect(preview()).toHaveAttribute("src", "https://example.com/working.jpg");
    fireEvent.load(preview());
    expect(screen.queryByText("Unable to load image")).not.toBeInTheDocument();
    fireEvent.change(field, { target: { value: "  " } });
    expect(
      screen.queryByRole("img", { name: "Network image preview" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Enter an image URL to preview it."),
    ).toBeInTheDocument();
  });

  it.each(Object.keys(expectedTitles) as ComponentName[])(
    "covers every documented %s variation with a real preview and configuration",
    (name) => {
      const { container } = render(<VariantGallery name={name} />);
      const gallery = screen.getByRole("region", {
        name: `${name} visual variants`,
      });
      expect(
        within(gallery)
          .getAllByRole("heading", { level: 4 })
          .map((heading) => heading.textContent),
      ).toEqual(expectedTitles[name]);
      const previews = container.querySelectorAll(".variantPreview");
      expect(previews).toHaveLength(expectedTitles[name].length);
      for (const preview of previews) expect(preview).not.toBeEmptyDOMElement();
      expect(
        container.querySelectorAll(".variantConfiguration code"),
      ).toHaveLength(previews.length);
      expect(componentGuides[name].length).toBeGreaterThanOrEqual(3);
    },
  );

  it("updates the controlled switch, range, code and radio outputs", () => {
    const view = render(<VariantGallery name="WelkSwitch" />);
    fireEvent.click(screen.getByRole("switch", { name: "Live setting" }));
    expect(screen.getByText("Current value: on")).toBeInTheDocument();
    view.rerender(<VariantGallery key="range" name="WelkRangeSlider" />);
    fireEvent.change(screen.getByLabelText("Live power"), {
      target: { value: "75" },
    });
    expect(screen.getByText("Current value: 75")).toBeInTheDocument();
    view.rerender(<VariantGallery key="otp" name="WelkOTPInput" />);
    fireEvent.change(screen.getByLabelText("Live verification"), {
      target: { value: "123456" },
    });
    expect(screen.getByText("Current value: 123456")).toBeInTheDocument();
    view.rerender(<VariantGallery key="radio" name="WelkRadioGroup" />);
    const group = screen.getByRole("radiogroup", { name: "Live role" });
    fireEvent.click(within(group).getByLabelText("Sidekick"));
    expect(screen.getByText("Current value: sidekick")).toBeInTheDocument();
  });

  it("toggles password visibility with the end action", () => {
    render(<VariantGallery name="WelkInput" />);
    const input = screen.getByLabelText("Secret identity");
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("changes local menu routes without leaving the component page and collapses the menu", () => {
    render(<VariantGallery name="WelkMenu" />);
    const flat = screen
      .getByRole("heading", { name: "Flat", level: 4 })
      .closest("article")!;
    const link = within(flat).getByRole("link", { name: "Components" });
    const location = window.location.href;
    fireEvent.click(link);
    expect(link).toHaveAttribute("aria-current", "page");
    expect(window.location.href).toBe(location);
    const toggle = screen.getByRole("button", { name: "Collapse menu" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it.each(["WelkCard", "WelkStickerCard"] as const)(
    "responds to %s actions and preserves disabled examples",
    (name) => {
      render(<VariantGallery name={name} />);
      const buttons = screen.getAllByRole("button", {
        name: /^Your next mission/,
      });
      expect(buttons.length).toBeGreaterThan(0);
      fireEvent.click(buttons[0]);
      expect(screen.getByText("Mission accepted!")).toBeInTheDocument();
      expect(buttons[buttons.length - 1]).toBeDisabled();
    },
  );

  it.each(["alert", "info", "warning", "error", "success"] as const)(
    "opens and closes the %s dialog example",
    (variant) => {
      render(<VariantGallery name="WelkDialog" />);
      fireEvent.click(
        screen.getByRole("button", { name: `Try ${variant} dialog` }),
      );
      const dialog = screen.getByRole("dialog", { name: `${variant} message` });
      expect(dialog.className).toContain(variant);
      fireEvent.click(within(dialog).getByRole("button", { name: "Okay" }));
      expect(dialog).not.toHaveAttribute("open");
    },
  );

  it("runs confirmation callbacks and can reopen the example", () => {
    render(<VariantGallery name="WelkDialog" />);
    const trigger = screen.getByRole("button", {
      name: "Try confirmation dialog",
    });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "Yes" }));
    expect(screen.getByText("Mission accepted.")).toBeInTheDocument();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "No" }));
    expect(screen.getByText("Mission declined.")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each(["left", "right", "top", "bottom"] as const)(
    "opens a real %s drawer and closes after the exit animation",
    (position) => {
      vi.useFakeTimers();
      render(<VariantGallery name="WelkDrawer" />);
      fireEvent.click(
        screen.getByRole("button", { name: `Try ${position} drawer` }),
      );
      const dialog = screen.getByRole("dialog", { name: `${position} drawer` });
      expect(dialog.className).toContain(position);
      expect(document.body.style.overflow).toBe("hidden");
      fireEvent.click(within(dialog).getByRole("button", { name: "Done" }));
      act(() => vi.advanceTimersByTime(200));
      expect(dialog).not.toHaveAttribute("open");
      expect(document.body.style.overflow).not.toBe("hidden");
    },
  );

  it.each(["default", "info", "success", "warning", "error"] as const)(
    "launches a real %s snackbar",
    (variant) => {
      vi.useFakeTimers();
      render(<VariantGallery name="WelkSnackBar" />);
      fireEvent.click(
        screen.getByRole("button", { name: `Try ${variant} notification` }),
      );
      const message = screen.getByRole("status");
      expect(message).toHaveTextContent(`${variant}: your comic notification!`);
      expect(message.parentElement?.className).toContain(variant);
      fireEvent.click(
        screen.getByRole("button", { name: "Dismiss notification" }),
      );
      act(() => vi.advanceTimersByTime(200));
      expect(
        screen.queryByText(`${variant}: your comic notification!`),
      ).not.toBeInTheDocument();
    },
  );

  it.each([
    "top-left",
    "top-middle",
    "top-right",
    "bottom-left",
    "bottom-middle",
    "bottom-right",
  ] as const)("launches the %s snackbar position", (position) => {
    render(<VariantGallery name="WelkSnackBar" />);
    fireEvent.click(
      screen.getByRole("button", { name: `Try ${position} notification` }),
    );
    expect(
      screen.getByRole("status").parentElement?.parentElement?.className,
    ).toContain(position);
  });

  it("auto-hides the timed notification after exactly four seconds", () => {
    vi.useFakeTimers();
    render(<VariantGallery name="WelkSnackBar" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Try auto-hide notification" }),
    );
    act(() => vi.advanceTimersByTime(3999));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Disappears after 4 seconds",
    );
    act(() => vi.advanceTimersByTime(1));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it.each(["bubble", "speech", "speach"] as const)(
    "reveals the %s tooltip through keyboard focus",
    (variant) => {
      render(<VariantGallery name="WelkTooltip" />);
      const trigger = screen.getByRole("button", { name: `${variant} hint` });
      fireEvent.focus(trigger);
      const hint = screen.getByRole("tooltip");
      expect(hint).toHaveTextContent("A helpful hint");
      expect(hint.className).toContain(
        variant === "speach" ? "speech" : variant,
      );
      expect(trigger).toHaveAttribute("aria-describedby", hint.id);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    },
  );
});
