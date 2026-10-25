import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../examples/react-vite/src/App";
import { catalogue } from "../../examples/react-vite/src/catalogue";
import { flutterWidgets } from "../../examples/react-vite/src/flutterWidgets";
import {
  interceptLinkClicks,
  normalizePath,
  redirectLegacyHash,
} from "../../examples/react-vite/src/router";
import {
  getSeo,
  getSeoTags,
  seoRoutes,
} from "../../examples/react-vite/src/seo";
import { faqs } from "../../examples/react-vite/src/siteContent";

const head = (selector: string) => document.head.querySelector(selector);
const jsonLd = () =>
  JSON.parse(
    head('script[type="application/ld+json"][data-seo]')!.textContent!,
  ) as { "@graph": Array<Record<string, unknown>> };
const nodeOfType = (type: string) =>
  jsonLd()["@graph"].find((node) => node["@type"] === type);

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

describe("showcase SEO", () => {
  it("lists every page once with unique titles, descriptions and canonicals", () => {
    expect(seoRoutes).toHaveLength(
      catalogue.length + flutterWidgets.length + 8,
    );
    const metadata = seoRoutes.map(getSeo);
    for (const key of ["title", "description", "canonical"] as const)
      expect(new Set(metadata.map((seo) => seo[key])).size).toBe(
        seoRoutes.length,
      );
    for (const seo of metadata) {
      expect(seo.indexable).toBe(true);
      expect(seo.canonical).toBe(`https://ui.welkdock.com${seo.path}`);
      expect(seo.title.length).toBeLessThanOrEqual(70);
      expect(seo.description.length).toBeGreaterThan(50);
      expect(seo.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("writes head metadata and updates it during client navigation", () => {
    render(<App />);
    expect(document.title).toBe(
      "WelkUI | Open-source comic-inspired React UI library",
    );
    expect(head('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://ui.welkdock.com/",
    );
    expect(head('meta[property="og:image"]')).toHaveAttribute(
      "content",
      expect.stringMatching(
        /^https:\/\/ui\.welkdock\.com\/.+welkui-og.*\.png$/,
      ),
    );
    expect(head('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    expect(nodeOfType("SoftwareSourceCode")).toMatchObject({
      codeRepository: "https://github.com/welkdock/welkUI",
    });

    fireEvent.click(screen.getByRole("button", { name: "FAQ" }));
    expect(window.location.pathname).toBe("/faq/");
    expect(document.title).toBe("FAQ | WelkUI React component library");
    expect(
      document.head.querySelectorAll('link[rel="canonical"]'),
    ).toHaveLength(1);
    expect(head('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://ui.welkdock.com/faq/",
    );
    expect(nodeOfType("FAQPage")!.mainEntity).toHaveLength(faqs.length);

    fireEvent.click(screen.getByRole("link", { name: "WelkUI home" }));
    expect(window.location.pathname).toBe("/");
  });

  it("describes component pages as articles with breadcrumbs", () => {
    window.history.replaceState(null, "", "/components/WelkSwitch/");
    render(<App />);
    expect(document.title).toContain("WelkSwitch");
    expect(head('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    expect(nodeOfType("TechArticle")).toMatchObject({
      headline: "WelkSwitch React component",
    });
    expect(
      (nodeOfType("BreadcrumbList")!.itemListElement as unknown[]).length,
    ).toBe(3);

    fireEvent.click(screen.getByRole("link", { name: "WelkButton" }));
    expect(window.location.pathname).toBe("/components/WelkButton/");
    expect(
      screen.getByRole("heading", { name: "WelkButton" }),
    ).toBeInTheDocument();
  });

  it("marks unknown pages noindex without a canonical", () => {
    window.history.replaceState(null, "", "/components/Unknown/");
    render(<App />);
    expect(head('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    expect(head('link[rel="canonical"]')).toBeNull();
    expect(
      getSeoTags(getSeo("/missing/")).some((tag) => tag.tag === "link"),
    ).toBe(false);
  });

  it("pre-renders route content for crawlers", () => {
    const html = renderToString(<App path="/faq/" />);
    expect(html).toContain("A little less mystery.");
    expect(html).toContain(faqs[0][0]);
  });

  it("normalizes paths, redirects legacy hash URLs and leaves external links alone", () => {
    expect(normalizePath("/faq")).toBe("/faq/");
    expect(normalizePath("")).toBe("/");
    window.history.replaceState(null, "", "/#/components/WelkBadge");
    expect(redirectLegacyHash()).toBe(true);
    expect(window.location.pathname).toBe("/components/WelkBadge/");
    expect(window.location.hash).toBe("");

    const external = document.createElement("a");
    external.href = "https://github.com/welkdock/welkUI";
    document.body.append(external);
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    act(() => {
      external.addEventListener("click", interceptLinkClicks);
      external.dispatchEvent(event);
    });
    expect(event.defaultPrevented).toBe(false);
    external.remove();
  });
});
