import { catalogue, type ComponentName } from "./catalogue";
import { getComponentDocs } from "./componentDocs";
import { faqs, organizationUrl, repository, siteUrl } from "./siteContent";
import ogImagePath from "../../../assets/images/welkui-og.png";
import logoPath from "../../../assets/images/welkui-logo.png";
import { editions } from "./editions";
import {
  flutterPackage,
  flutterWidgets,
  getFlutterWidget,
} from "./flutterWidgets";

type JsonLd = Record<string, unknown>;

export interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  indexable: boolean;
  type: "website" | "article";
  imageAlt: string;
  jsonLd: JsonLd;
}

export type SeoTag =
  | { tag: "meta"; attributes: Record<string, string> }
  | { tag: "link"; attributes: Record<string, string> }
  | { tag: "script"; attributes: Record<string, string>; content: string };

const siteName = "WelkUI";
const defaultDescription =
  "WelkUI is an open-source, comic-inspired React and TypeScript UI library with accessible components, live examples, and copy-ready code.";
const componentNames = [...catalogue]
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b)) as ComponentName[];

const absolute = (path: string) => new URL(path, siteUrl).href;
const organizationId = `${organizationUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const libraryId = `${siteUrl}/#library`;

const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "WelkDock Technologies",
  url: organizationUrl,
};
const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${siteUrl}/`,
  name: siteName,
  description: defaultDescription,
  inLanguage: "en",
  publisher: { "@id": organizationId },
};
const library = {
  "@type": "SoftwareSourceCode",
  "@id": libraryId,
  name: "WelkUI (@welkui/react)",
  description: defaultDescription,
  url: `${siteUrl}/`,
  codeRepository: repository,
  programmingLanguage: ["TypeScript", "CSS"],
  runtimePlatform: "React",
  license: "https://opensource.org/licenses/MIT",
  isAccessibleForFree: true,
  image: absolute(logoPath),
  author: { "@id": organizationId },
  publisher: { "@id": organizationId },
};

function breadcrumbs(items: Array<[name: string, path: string]>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absolute(path),
    })),
  };
}

const graph = (...nodes: JsonLd[]): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [organization, website, library, ...nodes],
});

function shorten(text: string, max = 160) {
  if (text.length <= max) return text;
  const sentence = text.slice(0, max).lastIndexOf(". ");
  if (sentence > 80) return text.slice(0, sentence + 1);
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

export function isComponentName(name: string): name is ComponentName {
  return componentNames.includes(name as ComponentName);
}

/** Every indexable route, used for pre-rendering and sitemap.xml. */
export const seoRoutes = [
  "/",
  "/components/",
  ...componentNames.map((name) => `/components/${name}/`),
  "/faq/",
  "/contributors/",
  "/flutter/",
  "/flutter/components/",
  ...flutterWidgets.map(({ name }) => `/flutter/components/${name}/`),
  "/flutter/faq/",
  "/flutter/contributors/",
];

export function getSeo(path: string): SeoMetadata {
  const [page = "", name] = path.split("/").filter(Boolean);
  const canonical = absolute(path);
  const base = {
    path,
    canonical,
    indexable: true,
    type: "website" as const,
    imageAlt: "WelkUI: comic-inspired React component library",
  };

  if (page === "flutter") {
    const flutterPages: Record<
      string,
      { title: string; description: string; schema: string }
    > = {
      "/flutter/": {
        title: "WelkUI Flutter | Comic-inspired mobile UI for Android & iOS",
        description:
          "Meet WelkUI Flutter, a comic-inspired widget library for Android and iOS apps. Install welkui_flutter from pub.dev and explore its docs.",
        schema: "WebPage",
      },
      "/flutter/components/": {
        title: "Flutter widgets for Android & iOS | WelkUI",
        description:
          "Browse WelkUI Flutter widgets for Android and iOS with live mobile previews, copy-ready Dart examples and constructor references.",
        schema: "CollectionPage",
      },
      ...Object.fromEntries(
        flutterWidgets.map((widget) => [
          `/flutter/components/${widget.name}/`,
          {
            title: `${widget.name} | Flutter widget & live preview | WelkUI`,
            description: shorten(
              `${widget.name} Flutter widget: ${widget.description} Try it in a live mobile preview.`,
            ),
            schema: "TechArticle",
          },
        ]),
      ),
      "/flutter/faq/": {
        title: "FAQ | WelkUI Flutter mobile widget library",
        description:
          "Answers about WelkUI Flutter: Android and iOS scope, package availability, mobile documentation, accessibility, and contributing to the Flutter project.",
        schema: "FAQPage",
      },
      "/flutter/contributors/": {
        title: "Flutter contributors | WelkUI",
        description:
          "Meet the contributors building WelkUI Flutter for Android and iOS, explore the mobile widget repository, and find ways to contribute on GitHub.",
        schema: "AboutPage",
      },
    };
    const flutterPage = flutterPages[path];
    const widget = getFlutterWidget(path.split("/").filter(Boolean)[2]);
    const flutterLibraryId = `${siteUrl}/#flutter-library`;
    const flutterLibrary = {
      ...library,
      "@id": flutterLibraryId,
      name: `WelkUI Flutter (${flutterPackage.name})`,
      description: flutterPages["/flutter/"].description,
      url: absolute("/flutter/"),
      codeRepository: editions.flutter.repository,
      programmingLanguage: "Dart",
      runtimePlatform: ["Android", "iOS"],
      version: flutterPackage.version,
      sameAs: [flutterPackage.url],
    };
    const flutterGraph = (...nodes: JsonLd[]) => ({
      "@context": "https://schema.org",
      "@graph": [
        organization,
        {
          ...website,
          description:
            "WelkUI documentation for React interfaces and Flutter mobile apps.",
        },
        flutterLibrary,
        ...nodes,
      ],
    });
    if (flutterPage) {
      return {
        ...base,
        ...(widget ? { type: "article" as const } : {}),
        title: flutterPage.title,
        description: flutterPage.description,
        imageAlt: "WelkUI Flutter: comic-inspired mobile widget library",
        jsonLd: flutterGraph(
          {
            "@type": flutterPage.schema,
            "@id": `${canonical}#webpage`,
            url: canonical,
            name: flutterPage.title,
            isPartOf: { "@id": websiteId },
            about: { "@id": flutterLibraryId },
            ...(flutterPage.schema === "FAQPage"
              ? {
                  mainEntity: editions.flutter.faqs.map(
                    ([question, answer]) => ({
                      "@type": "Question",
                      name: question,
                      acceptedAnswer: { "@type": "Answer", text: answer },
                    }),
                  ),
                }
              : {}),
          },
          breadcrumbs(
            path === "/flutter/"
              ? [["Flutter Home", "/flutter/"]]
              : widget
                ? [
                    ["Flutter Home", "/flutter/"],
                    ["Components", "/flutter/components/"],
                    [widget.name, path],
                  ]
                : [
                    ["Flutter Home", "/flutter/"],
                    [
                      name === "faq"
                        ? "FAQ"
                        : name === "contributors"
                          ? "Contributors"
                          : "Components",
                      path,
                    ],
                  ],
          ),
        ),
      };
    }
    return {
      ...base,
      canonical: undefined,
      indexable: false,
      title: "Page not found | WelkUI Flutter",
      description: "This WelkUI Flutter documentation page does not exist.",
      jsonLd: flutterGraph(),
    };
  }

  if (!page) {
    return {
      ...base,
      title: "WelkUI | Open-source comic-inspired React UI library",
      description: defaultDescription,
      jsonLd: graph({
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "WelkUI",
        isPartOf: { "@id": websiteId },
        about: { "@id": libraryId },
        primaryImageOfPage: absolute(ogImagePath),
      }),
    };
  }

  if (page === "components" && !name) {
    return {
      ...base,
      title: `React components (${componentNames.length}) | WelkUI`,
      description: `Browse ${componentNames.length} comic-inspired React components with live variants, prop tables, accessibility notes, and copy-ready TypeScript examples.`,
      jsonLd: graph(
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: "WelkUI React components",
          isPartOf: { "@id": websiteId },
          about: { "@id": libraryId },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: componentNames.length,
            itemListElement: componentNames.map((component, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: component,
              url: absolute(`/components/${component}/`),
            })),
          },
        },
        breadcrumbs([
          ["Home", "/"],
          ["Components", "/components/"],
        ]),
      ),
    };
  }

  if (page === "components" && name && isComponentName(name)) {
    const docs = getComponentDocs(name);
    const description = shorten(`${name} React component: ${docs.description}`);
    return {
      ...base,
      type: "article",
      title: `${name} | React component docs & examples | WelkUI`,
      description,
      imageAlt: `${name} from the WelkUI React component library`,
      jsonLd: graph(
        {
          "@type": "TechArticle",
          "@id": `${canonical}#article`,
          url: canonical,
          headline: `${name} React component`,
          description,
          proficiencyLevel: "Beginner",
          inLanguage: "en",
          image: absolute(ogImagePath),
          isPartOf: { "@id": websiteId },
          about: { "@id": libraryId },
          author: { "@id": organizationId },
          publisher: { "@id": organizationId },
          keywords: [
            name,
            "React",
            "TypeScript",
            "UI component",
            ...docs.variants,
          ]
            .slice(0, 12)
            .join(", "),
        },
        breadcrumbs([
          ["Home", "/"],
          ["Components", "/components/"],
          [name, path],
        ]),
      ),
    };
  }

  if (page === "faq" && !name) {
    return {
      ...base,
      title: "FAQ | WelkUI React component library",
      description:
        "Answers about WelkUI: Next.js support, local installation, styling with CSS tokens, accessibility, and file attachments.",
      jsonLd: graph(
        {
          "@type": "FAQPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          isPartOf: { "@id": websiteId },
          mainEntity: faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
        breadcrumbs([
          ["Home", "/"],
          ["FAQ", "/faq/"],
        ]),
      ),
    };
  }

  if (page === "contributors" && !name) {
    return {
      ...base,
      title: "Contributors | WelkUI",
      description:
        "Meet the people building WelkUI, the open-source comic-inspired React UI library, and learn how to contribute on GitHub.",
      jsonLd: graph(
        {
          "@type": "AboutPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: "WelkUI contributors",
          isPartOf: { "@id": websiteId },
          about: { "@id": libraryId },
        },
        breadcrumbs([
          ["Home", "/"],
          ["Contributors", "/contributors/"],
        ]),
      ),
    };
  }

  return {
    ...base,
    canonical: undefined,
    indexable: false,
    title: "Page not found | WelkUI",
    description: "This WelkUI page does not exist.",
    jsonLd: graph(),
  };
}

export function getSeoTags(seo: SeoMetadata): SeoTag[] {
  const image = absolute(ogImagePath);
  const meta = (key: "name" | "property", value: string, content: string) => ({
    tag: "meta" as const,
    attributes: { [key]: value, content },
  });
  return [
    meta("name", "description", seo.description),
    meta(
      "name",
      "robots",
      seo.indexable
        ? "index, follow, max-image-preview:large, max-snippet:-1"
        : "noindex, follow",
    ),
    ...(seo.canonical
      ? [
          {
            tag: "link" as const,
            attributes: { rel: "canonical", href: seo.canonical },
          },
          meta("property", "og:url", seo.canonical),
        ]
      : []),
    meta("property", "og:type", seo.type),
    meta("property", "og:site_name", siteName),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:image", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", seo.imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", seo.imageAlt),
    {
      tag: "script",
      attributes: { type: "application/ld+json" },
      content: JSON.stringify(seo.jsonLd),
    },
  ];
}

/** Keeps document metadata in sync during client-side navigation. */
export function applySeo(seo: SeoMetadata) {
  document.title = seo.title;
  document.head
    .querySelectorAll("[data-seo]")
    .forEach((element) => element.remove());
  for (const item of getSeoTags(seo)) {
    const element = document.createElement(item.tag);
    for (const [key, value] of Object.entries(item.attributes))
      element.setAttribute(key, value);
    element.setAttribute("data-seo", "");
    if (item.tag === "script") element.textContent = item.content;
    document.head.append(element);
  }
}
