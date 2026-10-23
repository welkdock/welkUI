import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../examples/react-vite/src/App";
import {
  catalogue,
  ComponentDemo,
} from "../../examples/react-vite/src/catalogue";
import * as components from "../components";
import { getComponentDocs } from "../../examples/react-vite/src/componentDocs";
import githubLogo from "../../assets/images/github.svg";
import welkuiLogo from "../../assets/images/welkui-logo.png";

function navigate(path: string) {
  act(() => {
    window.history.replaceState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("WelkUI showcase", () => {
  it("shows both tab variants in the main component preview and usage", () => {
    render(<ComponentDemo name="WelkTabs" />);
    const defaultTabs = screen.getByRole("tablist", {
      name: "Mission information",
    });
    const backgroundTabs = screen.getByRole("tablist", {
      name: "Mission information with background",
    });
    fireEvent.click(
      within(backgroundTabs).getByRole("tab", { name: "Objectives" }),
    );
    expect(
      within(backgroundTabs).getByRole("tab", { name: "Objectives" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      within(defaultTabs).getByRole("tab", { name: "Overview" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      catalogue.find((entry) => entry.name === "WelkTabs")?.code,
    ).toContain('variant="withBg"');
  });

  it("covers every public component exactly once", () => {
    const names = catalogue.map((entry) => entry.name).sort();
    expect(names).toEqual(
      Object.keys(components)
        .filter((name) => name.startsWith("Welk"))
        .sort(),
    );
    expect(new Set(names).size).toBe(names.length);
    for (const entry of catalogue) {
      expect(entry.code).toContain(entry.name);
      expect(entry.info.length).toBeGreaterThan(0);
    }
  });

  it("shows the branded landing page and a bottom explorer call to action", () => {
    render(<App />);
    const home = screen.getByRole("link", { name: "WelkUI home" });
    expect(home.querySelector("img.brandLogo")).toHaveAttribute(
      "src",
      welkuiLogo,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Playful interfaces.",
    );
    expect(
      screen.getByRole("button", { name: "Show more / test components" }),
    ).toBeInTheDocument();
    expect(document.querySelector(".heroArt img")).toHaveAttribute(
      "src",
      expect.stringContaining("react.svg.webp"),
    );
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("A Product of WelkDock Technologies");
    expect(
      screen.getByText(/An open-source React UI library for comical minds/),
    ).toBeInTheDocument();
    for (const name of ["Open source on GitHub", "View source on GitHub"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/welkdock/welkUI",
      );
      expect(link.querySelector("img")).toHaveAttribute("src", githubLogo);
      expect(link.querySelector("img")).toHaveAttribute("alt", "");
    }
    expect(
      within(footer).getByRole("link", { name: "WelkDock Technologies" }),
    ).toHaveAttribute("href", "https://www.welkdock.com");
  });

  it("lists components alphabetically and shows one selected demo with usage", () => {
    const consoleError = vi.spyOn(console, "error");
    navigate("/components/WelkSwitch/");
    render(<App />);
    const links = within(
      screen.getByRole("navigation", { name: "Component list" }),
    ).getAllByRole("link");
    const names = links.map((link) => link.textContent);
    expect(names).toEqual([...names].sort((a, b) => a!.localeCompare(b!)));
    expect(
      screen.getByRole("heading", { name: "WelkSwitch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Hero mode" })).toBeChecked();
    expect(
      screen.queryByLabelText("Verification code"),
    ).not.toBeInTheDocument();
    navigate("/components/WelkInput/");
    expect(screen.getByLabelText("Hero name")).toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(document.querySelector("pre code")).toHaveTextContent(
      "import { WelkInput }",
    );
    expect(
      screen.getByRole("region", { name: "WelkInput visual variants" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "WelkSwitch visual variants" }),
    ).not.toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("provides FAQ, live contributor credits and not-found states", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify([
            {
              id: 62955737,
              login: "No0b-master",
              avatar_url:
                "https://avatars.githubusercontent.com/u/62955737?v=4",
              contributions: 4,
            },
          ]),
        ),
      ),
    );
    render(<App />);
    navigate("/faq/");
    fireEvent.click(screen.getByText("What is WelkUI?"));
    expect(
      screen.getByText("What is WelkUI?").closest("details"),
    ).toHaveAttribute("open");
    navigate("/contributors/");
    expect(
      await screen.findByRole("link", { name: "No0b-master" }),
    ).toHaveAttribute("href", "https://github.com/No0b-master");
    const avatar = screen.getByRole("img", { name: "No0b-master" });
    expect(avatar.querySelector("img")).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/62955737?v=4",
    );
    expect(avatar.className).toContain("lg");
    navigate("/components/Unknown/");
    expect(
      screen.getByRole("heading", { name: "Component not found" }),
    ).toBeInTheDocument();
    navigate("/unknown/");
    expect(
      screen.getByRole("heading", { name: "This panel is missing." }),
    ).toBeInTheDocument();
  });

  it("copies the exact displayed code and resets feedback on component navigation", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    navigate("/components/WelkSwitch/");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await screen.findByText("Code copied!");
    expect(writeText).toHaveBeenCalledExactlyOnceWith(
      document.querySelector("pre code")!.textContent,
    );
    expect(
      screen.getByRole("button", { name: "Copy code again" }),
    ).toBeEnabled();
    navigate("/components/WelkButton/");
    expect(screen.queryByText("Code copied!")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy code" })).toBeEnabled();
  });

  it.each(["unavailable", "denied"])(
    "reports %s clipboard access without claiming success",
    async (reason) => {
      const writeText = vi
        .fn()
        .mockRejectedValue(new DOMException("Not allowed", "NotAllowedError"));
      vi.stubGlobal("navigator", {
        ...navigator,
        clipboard: reason === "unavailable" ? undefined : { writeText },
      });
      navigate("/components/WelkInput/");
      render(<App />);
      fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
      await waitFor(() =>
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Could not copy code",
        ),
      );
      expect(screen.queryByText("Code copied!")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Copy code" })).toBeEnabled();
    },
  );

  it.each(catalogue.map((entry) => entry.name))(
    "documents %s descriptions, variants and props",
    (name) => {
      navigate(`/components/${name}/`);
      render(<App />);
      const docs = getComponentDocs(name);
      expect(screen.getByText(docs.description)).toBeInTheDocument();
      expect(docs.variants.length).toBeGreaterThan(0);
      for (const variant of docs.variants) {
        expect(screen.getByText(variant)).toBeInTheDocument();
      }
      const table = screen.getByRole("table", {
        name: `${name} prop reference`,
      });
      expect(within(table).getAllByRole("row")).toHaveLength(
        docs.props.length + 1,
      );
      expect(new Set(docs.props.map(([prop]) => prop)).size).toBe(
        docs.props.length,
      );
      for (const [prop, type, defaultValue, description] of docs.props) {
        const row = within(table)
          .getByRole("rowheader", { name: prop })
          .closest("tr")!;
        expect(row).toHaveTextContent(type);
        expect(row).toHaveTextContent(defaultValue);
        expect(row).toHaveTextContent(description);
      }
    },
  );

  it.each(catalogue.map((entry) => entry.name))(
    "renders the isolated %s preview",
    (name) => {
      const { container } = render(<ComponentDemo name={name} />);
      expect(container).not.toBeEmptyDOMElement();
    },
  );
});
