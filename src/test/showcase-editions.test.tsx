import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../examples/react-vite/src/App";
import { Contributors } from "../../examples/react-vite/src/Contributors";
import { editions, editionPath } from "../../examples/react-vite/src/editions";
import { FlutterPreview } from "../../examples/react-vite/src/FlutterPreview";
import { getPreviewUrl } from "../../examples/react-vite/src/flutterWidgets";
import { getSeo, seoRoutes } from "../../examples/react-vite/src/seo";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => vi.unstubAllGlobals());

function choose(edition: "React" | "Flutter") {
  fireEvent.click(
    screen.getByText(`${edition} Edition`, { selector: "button" }),
  );
}

describe("Website editions", () => {
  it("defaults to React and switches home content, icons, links and footer", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    expect(
      within(header).getByLabelText("Choose edition: React Edition"),
    ).toBeVisible();
    expect(document.querySelector(".heroArt img")).toHaveAttribute(
      "src",
      editions.react.icon,
    );
    const summary = within(header).getByLabelText(
      "Choose edition: React Edition",
    );
    fireEvent.click(summary);
    expect(
      within(header)
        .getByRole("button", { name: "Flutter Edition" })
        .querySelector("img"),
    ).toHaveAttribute("src", editions.flutter.icon);
    expect(
      within(header)
        .getByRole("button", { name: "React Edition" })
        .querySelector("img"),
    ).toHaveAttribute("src", editions.react.icon);
    choose("Flutter");
    expect(window.location.pathname).toBe("/flutter/");
    expect(
      screen.getByText(/An open-source mobile UI library for comical minds/),
    ).toBeVisible();
    expect(document.querySelector(".heroArt img")).toHaveAttribute(
      "src",
      editions.flutter.icon,
    );
    expect(
      screen.getByRole("button", { name: "Built for Flutter" }),
    ).toBeVisible();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "A little comic relief for mobile.",
    );
    expect(
      screen.getByRole("link", { name: "View source on GitHub" }),
    ).toHaveAttribute("href", editions.flutter.repository);
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Add it to your app in one line." }),
    ).toHaveTextContent("flutter pub add welkui_flutter");
    expect(
      screen.getByRole("link", { name: "View on pub.dev" }),
    ).toHaveAttribute("href", "https://pub.dev/packages/welkui_flutter");
    expect(
      screen.queryByRole("link", { name: "Get it on pub.dev" }),
    ).not.toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
    expect(document.querySelector(".editionSwitcher")).not.toHaveAttribute(
      "open",
    );
    fireEvent.click(screen.getByLabelText("Choose edition: Flutter Edition"));
    choose("React");
    expect(window.location.pathname).toBe("/");
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "A little comic relief for the web.",
    );
    expect(screen.getByRole("switch", { name: "Hero mode" })).toBeVisible();
  });

  it("keeps navigation, breadcrumbs and FAQ within Flutter Edition", () => {
    window.history.replaceState(null, "", "/flutter/");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Components" }));
    expect(window.location.pathname).toBe("/flutter/components/");
    expect(
      screen.getByRole("heading", { name: "Widget Field Guide" }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "Component list" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "WelkButton" })).toBeVisible();
    expect(document.querySelector("iframe")).toBeNull();
    expect(
      screen.queryByText("@welkui/react/styles.css"),
    ).not.toBeInTheDocument();
    expect(document.querySelector("pre")).toHaveTextContent(
      "flutter pub add welkui_flutter",
    );
    expect(
      screen.getByRole("table", { name: "WelkButton parameter reference" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /welkui_flutter \d/ }),
    ).toHaveAttribute("href", "https://pub.dev/packages/welkui_flutter");
    fireEvent.click(screen.getByRole("button", { name: "FAQ" }));
    expect(window.location.pathname).toBe("/flutter/faq/");
    expect(
      screen.getByText("Which platforms does Flutter Edition target?"),
    ).toBeVisible();
    expect(
      screen.queryByText("Does it work with Next.js?"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/flutter/",
    );
    fireEvent.click(screen.getByRole("link", { name: "WelkUI home" }));
    expect(window.location.pathname).toBe("/flutter/");
  });

  it("maps counterpart sections and shared components between editions", () => {
    expect(editionPath("/components/WelkSwitch/", "flutter")).toBe(
      "/flutter/components/WelkSwitch/",
    );
    expect(editionPath("/flutter/components/WelkCard/", "react")).toBe(
      "/components/WelkCard/",
    );
    expect(editionPath("/components/WelkModal/", "flutter")).toBe(
      "/flutter/components/",
    );
    expect(editionPath("/flutter/faq/", "react")).toBe("/faq/");
    expect(editionPath("/contributors/", "flutter")).toBe(
      "/flutter/contributors/",
    );
    expect(editionPath("/unknown/", "flutter")).toBe("/flutter/");
  });

  it("supports history changes, Escape and outside dismissal", () => {
    render(<App />);
    const summary = screen.getByLabelText("Choose edition: React Edition");
    fireEvent.click(summary);
    fireEvent.keyDown(summary, { key: "Escape" });
    expect(summary.closest("details")).not.toHaveAttribute("open");
    expect(summary).toHaveFocus();
    fireEvent.click(summary);
    fireEvent.pointerDown(screen.getByRole("heading", { level: 1 }));
    expect(summary.closest("details")).not.toHaveAttribute("open");
    act(() => {
      window.history.replaceState(null, "", "/flutter/faq/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(
      screen.getByLabelText("Choose edition: Flutter Edition"),
    ).toBeVisible();
    act(() => {
      window.history.replaceState(null, "", "/faq/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(
      screen.getByLabelText("Choose edition: React Edition"),
    ).toBeVisible();
    expect(screen.getByText("Does it work with Next.js?")).toBeVisible();
  });

  it("loads Flutter contributors from the supplied repository and resets on edition changes", async () => {
    let firstSignal: AbortSignal | null | undefined;
    const fetchMock = vi
      .fn()
      .mockImplementationOnce((_url: string, options: RequestInit) => {
        firstSignal = options.signal;
        return new Promise<Response>(() => {});
      })
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 1,
              login: "flutter-hero",
              avatar_url: "https://avatars.githubusercontent.com/u/1",
              contributions: 2,
            },
          ]),
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const view = render(<Contributors />);
    view.rerender(<Contributors edition="flutter" />);
    expect(firstSignal?.aborted).toBe(true);
    expect(
      await screen.findByRole("link", { name: "flutter-hero" }),
    ).toBeVisible();
    expect(fetchMock.mock.calls[1][0]).toContain(
      "/repos/welkdock/welkUI-flutter/contributors?",
    );
    expect(
      screen.getByRole("link", { name: "View contributors on GitHub" }),
    ).toHaveAttribute(
      "href",
      `${editions.flutter.repository}/graphs/contributors`,
    );
    expect(
      screen.getByRole("link", { name: "Explore the Flutter project" }),
    ).toHaveAttribute("href", editions.flutter.repository);
    expect(screen.getByRole("link", { name: "Browse issues" })).toHaveAttribute(
      "href",
      `${editions.flutter.repository}/issues`,
    );
  });

  it("pre-renders Flutter content and uses Flutter-specific metadata", () => {
    for (const path of seoRoutes.filter((route) =>
      route.startsWith("/flutter/"),
    )) {
      const seo = getSeo(path);
      expect(seo.indexable).toBe(true);
      expect(JSON.stringify(seo.jsonLd)).toContain(editions.flutter.repository);
      expect(JSON.stringify(seo.jsonLd)).not.toContain(
        '"runtimePlatform":"React"',
      );
      expect(renderToString(<App path={path} />)).toContain(
        "Choose edition: Flutter Edition",
      );
    }
    const widgetPage = renderToString(<App path="/flutter/components/" />);
    expect(widgetPage).toContain("Run live preview");
    expect(widgetPage).not.toContain("<iframe");
    expect(getSeo("/flutter/components/WelkButton/").indexable).toBe(true);
    expect(getSeo("/flutter/components/WelkModal/").indexable).toBe(false);
  });

  it("shows a Flutter-aware not-found page for unknown routes", () => {
    window.history.replaceState(null, "", "/flutter/components/Unknown/");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "This panel is missing." }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Go home" }));
    expect(window.location.pathname).toBe("/flutter/");
  });
});

describe("Flutter live preview", () => {
  it("builds embed URLs with the query before the hash route", () => {
    expect(getPreviewUrl("https://example.com/app/", "/button")).toBe(
      "https://example.com/app/?embed=1#/button",
    );
    expect(getPreviewUrl("https://example.com/app/?v=2#/old", "/card")).toBe(
      "https://example.com/app/?v=2&embed=1#/card",
    );
    expect(getPreviewUrl("http://localhost:8080", "/switch")).toBe(
      "http://localhost:8080/?embed=1#/switch",
    );
    expect(getPreviewUrl("http://example.com/", "/button")).toBeNull();
    expect(getPreviewUrl("javascript:alert(1)", "/button")).toBeNull();
    expect(getPreviewUrl("not a url", "/button")).toBeNull();
  });

  it("shows a placeholder when the preview URL is not configured", () => {
    render(
      <FlutterPreview name="WelkButton" previewRoute="/button" baseUrl="" />,
    );
    expect(screen.getByText(/Live mobile preview coming soon/)).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Run live preview/ }),
    ).not.toBeInTheDocument();
  });

  it("loads the Flutter app only after the reader asks for it", () => {
    render(
      <FlutterPreview
        name="WelkSwitch"
        previewRoute="/switch"
        baseUrl="https://example.com/app/"
      />,
    );
    expect(document.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Run live preview/ }));
    const frame = screen.getByTitle("WelkSwitch live mobile preview");
    expect(frame).toHaveAttribute(
      "src",
      "https://example.com/app/?embed=1#/switch",
    );
    expect(frame).toHaveAttribute("sandbox", "allow-scripts allow-same-origin");
    expect(screen.getByRole("status")).toHaveTextContent("Starting");
    fireEvent.load(frame);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Open preview in a new tab" }),
    ).toHaveAttribute("href", "https://example.com/app/?embed=1#/switch");
  });
});
