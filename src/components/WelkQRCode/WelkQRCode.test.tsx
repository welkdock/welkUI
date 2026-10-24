import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WelkQRCode } from "./WelkQRCode";
import styles from "./WelkQRCode.module.css";

describe("WelkQRCode", () => {
  it("renders an accessible QR code for a valid HTTPS URL", () => {
    const { container } = render(
      <WelkQRCode url="https://example.com/mission" />,
    );
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "QR code for https://example.com/mission",
      }),
    ).toBe(svg);
    expect(svg).toHaveClass(styles.code);
    expect(container.querySelector(`.${styles.frame}`)).toBeInTheDocument();
  });

  it("renders rounded comic modules by default and square modules when requested", () => {
    const { container, rerender } = render(
      <WelkQRCode url="https://example.com" />,
    );
    const comicPath = container.querySelector("svg path");

    expect(comicPath?.getAttribute("d")).toContain("Q");
    expect(container.querySelector("svg rect")).toHaveAttribute(
      "fill",
      "#ffffff",
    );
    const comicModules = comicPath?.getAttribute("d")?.match(/M/g)?.length;

    rerender(<WelkQRCode url="https://example.com" originalCode />);

    const originalPath = container.querySelector("svg path")?.getAttribute("d");
    expect(originalPath).not.toContain("Q");
    expect(originalPath?.match(/M/g)?.length).toBe(comicModules);
  });

  it("renders an HTTP URL as a QR code", () => {
    const { container } = render(<WelkQRCode url="http://example.com" />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it.each(["", "example.com", "ftp://example.com", "javascript:alert(1)"])(
    "shows an error instead of a QR code for invalid URL %s",
    (url) => {
      const { container } = render(<WelkQRCode url={url} />);

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Enter a valid URL beginning with http:// or https://.",
      );
      expect(container.querySelector("svg")).not.toBeInTheDocument();
    },
  );

  it("updates the QR code when the URL changes", () => {
    const { rerender } = render(<WelkQRCode url="https://example.com/first" />);

    rerender(<WelkQRCode url="https://example.com/second" />);

    expect(
      screen.getByRole("img", {
        name: "QR code for https://example.com/second",
      }),
    ).toBeInTheDocument();
  });

  it("renders optional title and subtitle in the card variant", () => {
    const { container } = render(
      <WelkQRCode
        url="https://example.com"
        variant="card"
        title="Scan to visit"
        subtitle="Open the WelkUI website"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Scan to visit" }),
    ).toBeVisible();
    expect(screen.getByText("Open the WelkUI website")).toBeVisible();
    expect(container.querySelector(`.${styles.card}`)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "QR code for https://example.com" }),
    ).toBeInTheDocument();
  });

  it("applies a custom card color and supports a card without optional copy", () => {
    const { container } = render(
      <WelkQRCode
        url="https://example.com"
        variant="card"
        cardColor="#ffda57"
      />,
    );

    expect(container.querySelector(`.${styles.card}`)).toHaveStyle({
      backgroundColor: "#ffda57",
    });
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
