import { WelkAccordion, WelkBadge, WelkMenu } from "@welkui/react";
import { Code } from "./code";
import { FlutterPreview } from "./FlutterPreview";
import {
  flutterFontCode,
  flutterImport,
  flutterInstall,
  flutterPackage,
  flutterThemeCode,
  flutterWidgets,
  getFlutterWidget,
} from "./flutterWidgets";

export function FlutterComponents({ name }: { name?: string }) {
  const widget = name ? getFlutterWidget(name) : flutterWidgets[0];
  return (
    <>
      <h1>Component field guide</h1>
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
              <Code
                key={`install-${widget.name}`}
                language="Terminal"
                theme="dracula"
              >
                {flutterInstall}
              </Code>
              <p className="finePrint">
                Latest release:{" "}
                <a href={flutterPackage.url}>
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
              <p className="finePrint">
                Same look as the React{" "}
                <a href={`/components/${widget.name}/`}>{widget.name}</a>.
              </p>
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
