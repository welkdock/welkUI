import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../examples/react-vite/src/App";
import { Contributors } from "../../examples/react-vite/src/Contributors";
import { editions, editionPath } from "../../examples/react-vite/src/editions";
import { FlutterPreview } from "../../examples/react-vite/src/FlutterPreview";
import {
  flutterPackage,
  flutterWidgets,
  getPreviewUrl,
} from "../../examples/react-vite/src/flutterWidgets";
import { getSeo, seoRoutes } from "../../examples/react-vite/src/seo";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
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
    const npmLink = screen.getByRole("link", { name: "Get it on npm" });
    expect(npmLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@welkui/react",
    );
    expect(npmLink.querySelector("img")).toHaveAttribute("width", "36");
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
      screen.queryByRole("link", { name: "Get it on npm" }),
    ).not.toBeInTheDocument();
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
    expect(
      screen.getByText(`v${flutterPackage.version} on pub.dev`),
    ).toBeVisible();
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
    for (const { name } of flutterWidgets) {
      expect(editionPath(`/components/${name}/`, "flutter")).toBe(
        `/flutter/components/${name}/`,
      );
      expect(editionPath(`/flutter/components/${name}/`, "react")).toBe(
        `/components/${name}/`,
      );
    }
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

  it("lists all 30 widget destinations with unique preview routes", () => {
    expect(flutterWidgets).toHaveLength(30);
    expect(new Set(flutterWidgets.map(({ name }) => name)).size).toBe(30);
    expect(
      new Set(flutterWidgets.map(({ previewRoute }) => previewRoute)).size,
    ).toBe(30);
    render(<App path="/flutter/components/" />);
    const navigation = screen.getByRole("navigation", {
      name: "Component list",
    });
    for (const { name } of flutterWidgets) {
      expect(within(navigation).getByRole("link", { name })).toHaveAttribute(
        "href",
        `/flutter/components/${name}/`,
      );
    }
  });

  it.each(flutterWidgets)(
    "renders $name documentation and its lazy preview",
    (widget) => {
      const path = `/flutter/components/${widget.name}/`;
      expect(seoRoutes).toContain(path);
      expect(getSeo(path).title).toContain(widget.name);
      render(<App path={path} />);
      expect(screen.getByRole("heading", { name: widget.name })).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Widget Field Guide" }),
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Usage notes and accessibility" }),
      ).toBeVisible();
      const code = document.querySelectorAll(".flutterDocs pre")[1];
      expect(code).toHaveTextContent(widget.code.replace(/\s+/g, " ").trim());
      const table = screen.getByRole("table", {
        name: `${widget.name} parameter reference`,
      });
      expect(within(table).getAllByRole("row")).toHaveLength(
        widget.parameters.length + 2,
      );
      const darkModeRow = within(table).getByRole("row", {
        name: /^overRideDarkMode /,
      });
      expect(
        within(darkModeRow).getByRole("rowheader", {
          name: "overRideDarkMode",
        }),
      ).toBeVisible();
      expect(
        within(darkModeRow)
          .getAllByRole("cell")
          .map((cell) => cell.textContent),
      ).toEqual([
        "bool?",
        "null",
        "Force dark (true) or light (false) mode. Null inherits the theme preference.",
      ]);
      expect(screen.getByRole("heading", { name: "Dark mode" })).toBeVisible();
      for (const [parameter] of widget.parameters) {
        expect(
          within(table).getByRole("rowheader", { name: parameter }),
        ).toBeVisible();
      }
      expect(document.querySelector("iframe")).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: /Run live preview/ }));
      expect(document.querySelector("iframe")).toHaveAttribute(
        "src",
        `https://welkdock.github.io/welkUI-flutter/#${widget.previewRoute}`,
      );
    },
  );

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
  it("scales a phone-sized viewport to fit the frame and responds to resizing", () => {
    let onResize: ResizeObserverCallback | undefined;
    const observer = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
    vi.stubGlobal(
      "ResizeObserver",
      vi.fn(function (callback: ResizeObserverCallback) {
        onResize = callback;
        return observer;
      }),
    );
    const bounds = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue(new DOMRect(0, 0, 260, 520));
    const view = render(
      <FlutterPreview name="WelkDateInput" previewRoute="/date-input" />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Run live preview/ }));
    const frame = screen.getByTitle("WelkDateInput live mobile preview");
    expect(frame).toHaveStyle({
      width: "390px",
      height: "150%",
      transform: `scale(${260 / 390})`,
      transformOrigin: "top left",
    });
    bounds.mockReturnValue(new DOMRect(0, 0, 312, 624));
    act(() => onResize?.([], observer));
    expect(frame).toHaveStyle({ height: "125%", transform: "scale(0.8)" });
    expect(observer.observe).toHaveBeenCalledWith(
      document.querySelector(".phoneViewport"),
    );
    view.unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });

  it("builds preview URLs without adding an embed flag and preserves existing queries", () => {
    expect(getPreviewUrl("https://example.com/app/", "/button")).toBe(
      "https://example.com/app/#/button",
    );
    expect(getPreviewUrl("https://example.com/app/?v=2#/old", "/card")).toBe(
      "https://example.com/app/?v=2#/card",
    );
    expect(getPreviewUrl("http://localhost:8080", "/switch")).toBe(
      "http://localhost:8080/#/switch",
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
    expect(frame).toHaveAttribute("src", "https://example.com/app/#/switch");
    expect(frame).toHaveAttribute("sandbox", "allow-scripts allow-same-origin");
    expect(screen.getByRole("status")).toHaveTextContent("Starting");
    fireEvent.load(frame);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Open preview in a new tab" }),
    ).toHaveAttribute("href", "https://example.com/app/#/switch");
  });
});
