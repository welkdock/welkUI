import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  WelkAccordion,
  WelkBadge,
  WelkBreadCrumbs,
  WelkButton,
  WelkCard,
  WelkDivider,
  WelkMenu,
  WelkStickerCard,
  WelkSwitch,
} from "@welkui/react";
import { catalogue, ComponentDemo } from "./catalogue";
import { getComponentDocs } from "./componentDocs";
import { componentGuides } from "./componentGuides";
import { VariantGallery } from "./VariantGallery";
import githubLogo from "../../../assets/images/github.svg";
import npmLogo from "../../../assets/images/npm.svg";
import welkuiLogo from "../../../assets/images/welkui-logo.png";
import {
  getServerPath,
  getPath,
  interceptLinkClicks,
  navigate,
  subscribe,
} from "./router";
import { applySeo, getSeo } from "./seo";
import { editions, getEdition, type Edition } from "./editions";
import { EditionSwitcher } from "./EditionSwitcher";
import { FlutterComponents } from "./FlutterComponents";
import { FlutterRecordings } from "./FlutterRecordings";
import {
  flutterImport,
  flutterInstall,
  flutterPackage,
} from "./flutterWidgets";
import { Code } from "./code";
import { Contributors } from "./Contributors";

const pages = [
  { title: "Home", route: "/" },
  { title: "Components", route: "/components/" },
  { title: "FAQ", route: "/faq/" },
  { title: "Contributors", route: "/contributors/" },
];
const sorted = [...catalogue].sort((a, b) => a.name.localeCompare(b.name));

function Home({ edition }: { edition: Edition }) {
  const { prefix, icon, repository } = editions[edition];
  const flutter = edition === "flutter";
  const go = (path: string) => navigate(`${prefix}${path}`);
  return (
    <>
      <section className="hero">
        <div>
          <WelkBadge>UI WITH A PLOT TWIST</WelkBadge>
          <h1>
            Serious building.
            <br />
            <span>Playful interfaces.</span>
          </h1>
          <p className="lede">
            {flutter
              ? "Meet WelkUI Flutter. An open-source mobile UI library for comical minds. Comic-inspired widgets for Android and iOS apps with a little more character."
              : "Meet WelkUI. An open-source React UI library for comical minds. Comic-inspired components for interfaces with a little more character."}
          </p>
          <div className="row">
            <WelkButton
              onClick={() => {
                go("/components/");
              }}
            >
              {flutter ? "Explore mobile widgets" : "Explore components"}
            </WelkButton>
            {!flutter && (
              <a
                className="githubLink"
                href="https://www.npmjs.com/package/@welkui/react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={npmLogo} alt="" width={36} height={14} />
                Get it on npm
              </a>
            )}
            <a className="githubLink" href={repository}>
              <img src={githubLogo} alt="" width={24} height={24} />
              Open source on GitHub
            </a>
          </div>
        </div>
        <div className="heroArt">
          <WelkStickerCard
            title="Hello, hero."
            subtitle="Your next great interface starts here."
            sticker={{ src: icon, alt: "" }}
            onClick={() => {
              go(flutter ? "/components/" : "/components/WelkStickerCard/");
            }}
          />
          <div className="row">
            <WelkBadge variant="success">
              {flutter ? "Android + iOS" : `${catalogue.length} components`}
            </WelkBadge>
            <WelkBadge>
              {flutter
                ? `v${flutterPackage.version} on pub.dev`
                : "100% personality"}
            </WelkBadge>
          </div>
        </div>
      </section>
      {flutter && (
        <section
          className="section installSection"
          aria-labelledby="install-title"
        >
          <div>
            <p className="eyebrow">GET IT ON PUB.DEV</p>
            <h2 id="install-title">Add it to your app in one line.</h2>
            <p>
              <a
                href={flutterPackage.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {flutterPackage.name} {flutterPackage.version}
              </a>{" "}
              is live on pub.dev. Requires Dart {flutterPackage.dart}+ and
              Flutter {flutterPackage.flutter}+.
            </p>
            <a
              className="githubLink"
              href={flutterPackage.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon} alt="" width={24} height={24} />
              View on pub.dev
            </a>
          </div>
          <div className="installSteps">
            <Code language="Terminal" theme="dracula">
              {flutterInstall}
            </Code>
            <Code language="Dart" theme="dracula">
              {flutterImport}
            </Code>
          </div>
        </section>
      )}
      <WelkDivider thickness={3} />
      <section className="section" aria-labelledby="features-title">
        <p className="eyebrow">SMALL DETAILS. BIG PERSONALITY.</p>
        <h2 id="features-title">Your interface, outside the box.</h2>
        <div className="featureGrid">
          <WelkCard
            title="Hand-drawn energy"
            subtitle="Uneven corners, bold outlines, cheerful colors. No bland defaults."
            onClick={() => {
              go(flutter ? "/components/WelkCard/" : "/components/WelkBadge/");
            }}
          />
          <WelkCard
            title={flutter ? "Built for Flutter" : "Built for React"}
            icon={
              <img
                src={icon}
                alt=""
                className="reactFeatureLogo"
                width={48}
                height={43}
              />
            }
            subtitle={
              flutter
                ? "Idiomatic Dart widgets for Android and iOS. Add them with flutter pub add."
                : "Typed props, independent exports, and Next.js client boundaries."
            }
            onClick={() => {
              go("/faq/");
            }}
          />
          <WelkCard
            title="Thoughtful interactions"
            subtitle={
              flutter
                ? "Mobile-first guidance for touch, text scaling, and screen readers."
                : "Native controls, keyboard focus, and respect for reduced motion."
            }
            onClick={() => {
              go("/components/WelkSwitch/");
            }}
          />
        </div>
      </section>
      <section className="section" aria-labelledby="preview-title">
        <p className="eyebrow">
          {flutter
            ? "A LITTLE COMIC MAGIC FOR MOBILE"
            : "TRY A LITTLE COMIC MAGIC"}
        </p>
        <h2 id="preview-title">
          {flutter
            ? "Mobile widgets. A new chapter."
            : "Real components. Ready to play."}
        </h2>
        {flutter ? (
          <FlutterRecordings />
        ) : (
          <div className="previewGrid">
            <article className="surface">
              <WelkBadge>01 / ACTION</WelkBadge>
              <h3>A button worth pressing</h3>
              <ComponentDemo name="WelkButton" />
            </article>
            <article className="surface">
              <WelkBadge variant="info">02 / CONTROL</WelkBadge>
              <h3>Switch things up</h3>
              <WelkSwitch label="Hero mode" />
            </article>
            <article className="surface">
              <WelkBadge variant="success">03 / DISCOVER</WelkBadge>
              <h3>A little more to the story</h3>
              <WelkAccordion title="Open a new chapter" fixedWidth="100%">
                Built with WelkUI, not another UI kit.
              </WelkAccordion>
            </article>
          </div>
        )}
      </section>
      <section
        className="projectSpotlight"
        aria-labelledby="project-spotlight-title"
      >
        <div className="projectSpotlightBrand" aria-hidden="true">
          <img src={welkuiLogo} alt="" width={96} height={96} />
          <span>YOUR NEXT BIG PANEL</span>
        </div>
        <div className="projectSpotlightCopy">
          <WelkBadge variant="info">BUILT WITH WELKUI. MADE BY YOU.</WelkBadge>
          <h2 id="project-spotlight-title">
            Your project deserves the spotlight.
          </h2>
          <p>
            Building something with WelkUI? We&apos;d love to see it. Email us
            your project for a chance to be featured in the showcase on our
            official website.
          </p>
          <p className="finePrint">
            Share a link, a few screenshots and a little about what you built.
            React or Flutter, big idea or side project — every story starts
            somewhere.
          </p>
          <a
            className="projectSpotlightLink"
            href={`mailto:contact@welkdock.com?subject=${encodeURIComponent("Built with WelkUI — showcase submission")}`}
          >
            Share your project <span aria-hidden="true">→</span>
          </a>
          <p className="projectSpotlightEmail">contact@welkdock.com</p>
        </div>
      </section>
      <section className="cta">
        <WelkBadge>THE STORY CONTINUES</WelkBadge>
        <h2>
          {flutter
            ? "Find your next favorite mobile widget."
            : "Find your next favorite component."}
        </h2>
        <p>
          {flutter
            ? "One widget at a time. Live mobile previews, copy-ready Dart, and every parameter."
            : "One component at a time. Live variants, detailed guides, and copy-ready examples."}
        </p>
        <WelkButton
          size="lg"
          onClick={() => {
            go("/components/");
          }}
        >
          {flutter
            ? "Explore Flutter documentation"
            : "Show more / test components"}
        </WelkButton>
      </section>
    </>
  );
}

function Components({ name }: { name?: string }) {
  const entry = name ? sorted.find((item) => item.name === name) : sorted[0];
  const docs = entry ? getComponentDocs(entry.name) : undefined;
  return (
    <>
      <h1>Component field guide</h1>
      <p>
        Explore live variants, compare states, and learn every prop. Pick a
        component to start.
      </p>
      <div className="explorer">
        <aside className="componentNav">
          <WelkMenu
            aria-label="Component list"
            collapsible
            activeRoute={`/components/${entry?.name ?? ""}/`}
            items={sorted.map((item) => ({
              title: item.name,
              route: `/components/${item.name}/`,
            }))}
          />
        </aside>
        <section className="componentDetail" aria-labelledby="component-title">
          {entry && docs ? (
            <>
              <WelkBadge variant="info">LIVE COMPONENT</WelkBadge>
              <h2 id="component-title">{entry.name}</h2>
              <p>{docs.description}</p>
              <div
                className="surface demoSurface"
                aria-label={`${entry.name} preview`}
              >
                <ComponentDemo key={entry.name} name={entry.name} />
              </div>
              <h3>Usage</h3>
              <Code
                key={entry.name}
              >{`${entry.code.includes("useState") ? 'import { useState } from "react";\n' : ""}import { ${[...new Set(entry.code.match(/Welk[A-Za-z]+/g) ?? [entry.name])].join(", ")} } from "@welkui/react";\n${entry.code.includes("{superman}") || entry.code.includes("src: superman") ? 'import superman from "./superman.png";\n' : ""}${entry.code.includes("{comic}") ? 'import comic from "./comic.jpg";\n' : ""}\n${entry.code}`}</Code>
              <p className="finePrint">
                Import <code>@welkui/react/styles.css</code> once in your app.
                Stateful snippets belong inside a React component.
              </p>
              <h3>Variants and behavior</h3>
              <ul className="variantList">
                {docs.variants.map((variant) => (
                  <li key={variant}>{variant}</li>
                ))}
              </ul>
              <h3>Visual variant gallery</h3>
              <VariantGallery
                key={`variants-${entry.name}`}
                name={entry.name}
              />
              <h3>Usage notes and accessibility</h3>
              <ul className="variantList">
                {componentGuides[entry.name].map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <h3>Props</h3>
              <p className="finePrint">
                Required props are marked in the default column. Other props are
                optional. ReactNode accepts text or JSX.
              </p>
              <div
                className="propsScroll"
                role="region"
                aria-label={`${entry.name} props`}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Allows keyboard scrolling of the overflowing prop table.
                tabIndex={0}
              >
                <table className="propsTable">
                  <caption>{entry.name} prop reference</caption>
                  <thead>
                    <tr>
                      <th scope="col">Prop</th>
                      <th scope="col">Type</th>
                      <th scope="col">Default</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.props.map(
                      ([prop, type, defaultValue, description]) => (
                        <tr key={prop}>
                          <th scope="row">
                            <code>{prop}</code>
                          </th>
                          <td>
                            <code>{type}</code>
                          </td>
                          <td>{defaultValue}</td>
                          <td>{description}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              {docs.native ? (
                <>
                  <h3>Native props and refs</h3>
                  <p>{docs.native}</p>
                </>
              ) : (
                <p className="finePrint">
                  This component supports the props listed above, not arbitrary
                  native HTML attributes.
                </p>
              )}
              <WelkAccordion
                title="Project setup, styling and Next.js"
                className="setupGuide"
              >
                <p>
                  Import <code>@welkui/react/styles.css</code> once in your app
                  entry or Next.js root layout. The previews use the default
                  theme; override <code>--welk-*</code> CSS tokens in your app
                  to customize it.
                </p>
                <p>
                  For Next.js, put hooks and event handlers in a component
                  beginning with <code>&quot;use client&quot;</code>. Keep state
                  local to the component using the control. The library
                  preserves its client boundaries and uses your installed React
                  version.
                </p>
                <p>
                  Use <code>defaultValue</code> or <code>defaultChecked</code>{" "}
                  for uncontrolled fields, or a state value and its change
                  callback for controlled fields. Do not switch between these
                  modes during the lifetime of a field.
                </p>
                <p>
                  Modal and notification examples start closed: use their Try
                  buttons to see them. Disabled examples are deliberately
                  non-interactive. Validate forms, uploads, authentication, and
                  server responses in your application; these components only
                  provide UI.
                </p>
              </WelkAccordion>
            </>
          ) : (
            <>
              <h2 id="component-title">Component not found</h2>
              <p>Choose a component from the menu.</p>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export function App({ path: renderPath }: { path?: string } = {}) {
  const livePath = useSyncExternalStore(subscribe, getPath, getServerPath);
  const path = renderPath ?? livePath;
  const edition = getEdition(path);
  const { prefix, repository, faqs } = editions[edition];
  const localPath = prefix ? path.slice(prefix.length) : path;
  const [page = "", name] = localPath.split("/").filter(Boolean);
  const current = page || "home";
  const pageTitle = pages.find((item) => item.route === `/${page}/`)?.title;
  const validRoute = getSeo(path).indexable;
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const [routeNotice, setRouteNotice] = useState("");

  useEffect(() => {
    document.addEventListener("click", interceptLinkClicks);
    return () => document.removeEventListener("click", interceptLinkClicks);
  }, []);

  useEffect(() => {
    applySeo(getSeo(path));
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);

  return (
    <div className="site">
      <header className="siteHeader">
        <a className="brand" href={`${prefix}/`} aria-label="WelkUI home">
          <img className="brandLogo" src={welkuiLogo} alt="" />
          Welk<span>UI</span>
          <span className="brandDot">!</span>
        </a>
        <nav className="row" aria-label="Site navigation">
          {pages.map((item) => (
            <WelkButton
              key={item.route}
              variant={
                localPath === item.route ||
                (item.route !== "/" && localPath.startsWith(item.route))
                  ? "primary"
                  : "ghost"
              }
              aria-current={
                current ===
                (item.title === "Home" ? "home" : item.title.toLowerCase())
                  ? "page"
                  : undefined
              }
              onClick={() => navigate(`${prefix}${item.route}`)}
            >
              {item.title}
            </WelkButton>
          ))}
        </nav>
        <EditionSwitcher edition={edition} path={path} />
      </header>
      <WelkDivider thickness={3} />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="main"
        key={path}
      >
        {current !== "home" && (
          <WelkBreadCrumbs
            items={[
              { label: "Home", href: `${prefix}/` },
              { label: pageTitle ?? "Not found" },
            ]}
          />
        )}
        {current === "home" && validRoute ? (
          <Home edition={edition} />
        ) : current === "components" && edition === "react" ? (
          <Components name={name} />
        ) : current === "components" && validRoute ? (
          <FlutterComponents name={name} />
        ) : current === "faq" && validRoute ? (
          <section className="section faq">
            <WelkBadge>GOOD QUESTIONS</WelkBadge>
            <h1>A little less mystery.</h1>
            <p>Short answers. More time to build.</p>
            <div className="stack">
              {faqs.map(([title, answer]) => (
                <WelkAccordion key={title} title={title}>
                  {answer}
                </WelkAccordion>
              ))}
            </div>
          </section>
        ) : current === "contributors" && validRoute ? (
          <Contributors edition={edition} />
        ) : (
          <section className="section">
            <h1>This panel is missing.</h1>
            <p>Head back to the beginning.</p>
            <WelkButton
              onClick={() => {
                navigate(`${prefix}/`);
              }}
            >
              Go home
            </WelkButton>
          </section>
        )}
      </main>
      <footer className="footer">
        <WelkDivider thickness={3} />
        <div className="footerRow">
          <p>
            <strong>WelkUI</strong> / A little comic relief for{" "}
            {edition === "flutter" ? "mobile" : "the web"}.
          </p>
          <a className="githubLink" href={repository}>
            <img src={githubLogo} alt="" width={24} height={24} />
            View source on GitHub
          </a>
        </div>
        <p className="finePrint">
          A Product of{" "}
          <a href="https://www.welkdock.com">WelkDock Technologies</a>
        </p>
        <WelkButton
          variant="ghost"
          size="sm"
          onClick={() => {
            setRouteNotice("Back to the top.");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          Back to top
        </WelkButton>
        <span role="status" className="finePrint">
          {routeNotice}
        </span>
      </footer>
    </div>
  );
}
