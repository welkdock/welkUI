import { WelkAccordion, WelkBadge, WelkMenu } from "@welkui/react";
import { Code } from "./code";
import { FlutterPreview } from "./FlutterPreview";
import {
  FlutterBottomNavGuide,
  FlutterBottomNavInstall,
} from "./FlutterBottomNavGuide";
import { catalogue } from "./catalogue";
import {
  flutterDarkModeCode,
  flutterDarkModeOverrideCode,
  flutterFontCode,
  flutterImport,
  flutterInstall,
  flutterPackage,
  flutterThemeCode,
  flutterWidgets,
  getFlutterWidget,
} from "./flutterWidgets";

export function FlutterComponents({ name }: { name?: string }) {
  const widget = getFlutterWidget(name ?? "WelkButton");
  return (
    <>
      <h1>Widget Field Guide</h1>
      <p>
        Explore Flutter widgets for Android and iOS. Pick a widget, run its live
        mobile preview, and copy the Dart code.
      </p>
      <div className="explorer flutterExplorer">
        <aside className="componentNav">
          <WelkMenu
            aria-label="Component list"
            collapsible
            activeRoute={`/flutter/components/${widget?.name ?? ""}/`}
            items={flutterWidgets.map((item) => ({
              title: item.name,
              route: `/flutter/components/${item.name}/`,
            }))}
          />
        </aside>
        {widget && (
          <>
            <div className="componentDetail flutterIntro">
              <WelkBadge variant="info">LIVE MOBILE PREVIEW</WelkBadge>
              <h2 id="component-title">{widget.name}</h2>
              <p>{widget.description}</p>
              <p>
                Every WelkUI Flutter widget supports dark mode, including this
                one.{" "}
                <a href="#flutter-dark-mode">
                  Learn how to enable or disable it
                </a>
                .
              </p>
            </div>
            <aside
              className="flutterDevice"
              aria-label={`${widget.name} live mobile preview`}
            >
              <FlutterPreview
                key={widget.name}
                name={widget.name}
                previewRoute={widget.previewRoute}
              />
            </aside>
            <section
              className="componentDetail flutterDocs"
              aria-labelledby="component-title"
            >
              <h3>Install</h3>
              {widget.name === "WelkBottomNavBar" ? (
                <FlutterBottomNavInstall />
              ) : (
                <Code
                  key={`install-${widget.name}`}
                  language="Terminal"
                  theme="dracula"
                >
                  {flutterInstall}
                </Code>
              )}
              <p className="finePrint">
                Latest release:{" "}
                <a
                  href={flutterPackage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {flutterPackage.name} {flutterPackage.version}
                </a>{" "}
                on pub.dev. Requires Dart {flutterPackage.dart}+ and Flutter{" "}
                {flutterPackage.flutter}+.
              </p>
              <h3>Usage</h3>
              <Code
                key={widget.name}
                language="Dart"
                theme="dracula"
              >{`${flutterImport}\n\n${widget.code}`}</Code>
              {catalogue.some((item) => item.name === widget.name) && (
                <p className="finePrint">
                  Same look as the React{" "}
                  <a href={`/components/${widget.name}/`}>{widget.name}</a>.
                </p>
              )}
              <h3>Variants and behavior</h3>
              <ul className="variantList">
                {widget.design.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Usage notes and accessibility</h3>
              <ul className="variantList">
                {widget.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              {widget.name === "WelkBottomNavBar" && <FlutterBottomNavGuide />}
              <h3 id="flutter-dark-mode">Dark mode</h3>
              <p>
                Control all widgets, pickers, and overlays with{" "}
                <code>WelkThemeData.darkMode</code>: set it to <code>true</code>{" "}
                to enable dark mode or <code>false</code> to disable it. When
                left <code>null</code> (the default), widgets follow
                Flutter&apos;s <code>ThemeData.brightness</code>. To follow the
                device setting, provide light and dark themes on{" "}
                <code>MaterialApp</code> and use <code>ThemeMode.system</code>.
              </p>
              <p>
                Place <code>WelkTheme</code> above <code>MaterialApp</code> so
                open popups and overlays also follow global updates. Rebuild it
                with <code>data.copyWith(darkMode: true)</code> or{" "}
                <code>data.copyWith(darkMode: false)</code> to switch modes.
                This example also switches the Material theme to keep the
                app&apos;s scaffold and other Material widgets in sync:
              </p>
              <Code language="Dart" theme="dracula">
                {`${flutterImport}\n\n${flutterDarkModeCode}`}
              </Code>
              <h4>Override a widget</h4>
              <p>
                Set <code>overRideDarkMode: true</code> to force dark mode or{" "}
                <code>overRideDarkMode: false</code> to force light mode,
                regardless of the global setting. Omit it (or pass{" "}
                <code>null</code>) to inherit. Container overrides flow into
                nested WelkUI widgets, and dialog, drawer, and snackbar show
                functions accept the same override. Local themes are carried
                into overlays when opened.
              </p>
              <Code language="Dart" theme="dracula">
                {flutterDarkModeOverrideCode}
              </Code>
              <h4>Dark palette and appearance</h4>
              <p>
                Neutral surfaces, text, and icons adapt automatically. Semantic
                variant fills receive a 10% black tint, with black borders and
                whitish-gray hard shadows. Secondary buttons use charcoal-gray
                surfaces; ghost buttons stay transparent. QR codes keep a light
                backing and dark modules for scanning. Built-in avatar portraits
                switch to white assets in dark mode; custom icons and profile
                images are not filtered.
              </p>
              <p>
                Customize the palette through <code>WelkThemeData</code> using{" "}
                <code>darkPaper</code>, <code>darkMuted</code>,{" "}
                <code>darkInk</code>, <code>darkOutline</code>,{" "}
                <code>darkShadow</code>, <code>darkButtonTint</code>, and{" "}
                <code>darkFocus</code>. See the{" "}
                <a href="https://github.com/welkdock/welkUI-flutter#global-dark-mode">
                  Flutter README&apos;s global dark mode guide
                </a>{" "}
                for the package reference.
              </p>
              <h3>Constructor parameters</h3>
              <p className="finePrint">
                Required parameters are marked in the default column. Other
                parameters are optional.
              </p>
              <div
                className="propsScroll"
                role="region"
                aria-label={`${widget.name} parameters`}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Allows keyboard scrolling of the overflowing parameter table.
                tabIndex={0}
              >
                <table className="propsTable">
                  <caption>{widget.name} parameter reference</caption>
                  <thead>
                    <tr>
                      <th scope="col">Parameter</th>
                      <th scope="col">Type</th>
                      <th scope="col">Default</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <code>overRideDarkMode</code>
                      </th>
                      <td>
                        <code>bool?</code>
                      </td>
                      <td>null</td>
                      <td>
                        Force dark (true) or light (false) mode. Null inherits
                        the theme preference.
                      </td>
                    </tr>
                    {widget.parameters.map(
                      ([parameter, type, defaultValue, description]) => (
                        <tr key={parameter}>
                          <th scope="row">
                            <code>{parameter}</code>
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
              <WelkAccordion
                title="Project setup, theming and typography"
                className="setupGuide"
              >
                <p>
                  WelkUI Flutter targets Android and iOS. It uses Dart widgets,
                  not the React package or its CSS stylesheet. Defaults work
                  without a theme wrapper.
                </p>
                <p>
                  Override shared colors and strokes with <code>WelkTheme</code>{" "}
                  and immutable <code>WelkThemeData</code>:
                </p>
                <Code language="Dart" theme="dracula">
                  {flutterThemeCode}
                </Code>
                <p>
                  The Short Stack font is bundled and registered by the package,
                  so you don't need to declare font assets or download fonts at
                  runtime. To use it outside the widgets:
                </p>
                <Code language="Dart" theme="dracula">
                  {flutterFontCode}
                </Code>
              </WelkAccordion>
            </section>
          </>
        )}
      </div>
    </>
  );
}
