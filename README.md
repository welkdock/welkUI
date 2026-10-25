<div align="center">

<a href="https://ui.welkdock.com">
  <img src="./docs/images/banner.png" alt="WelkUI — comic-inspired React component library" width="820" />
</a>

<h3>Serious building. Playful interfaces.</h3>

<p>
  An open-source React + TypeScript UI library for comical minds.<br />
  29 hand-drawn, accessible components for React and Next.js.
</p>

<p>
  <a href="https://github.com/welkdock/welkUI/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/welkdock/welkUI/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-ffda57?labelColor=242424" /></a>
  <img alt="React 18 and 19" src="https://img.shields.io/badge/React-18%20%7C%2019-82caff?logo=react&labelColor=242424" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-ready-3057c4?logo=typescript&logoColor=white&labelColor=242424" />
  <img alt="29 components" src="https://img.shields.io/badge/components-29-8ddd9b?labelColor=242424" />
  <a href="./CONTRIBUTING.md"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-ff8a80?labelColor=242424" /></a>
</p>

<p>
  <a href="https://ui.welkdock.com"><b>Website</b></a> ·
  <a href="https://ui.welkdock.com/components/"><b>Component explorer</b></a> ·
  <a href="./docs/COMPONENTS.md"><b>API reference</b></a> ·
  <a href="./CONTRIBUTING.md"><b>Contributing</b></a> ·
  <a href="https://github.com/welkdock/welkUI/issues"><b>Issues</b></a>
</p>

</div>

<br />

<p align="center">
  <img src="./docs/images/landing.png" alt="WelkUI landing page with a comic hero, React sticker card and playful navigation" width="100%" />
</p>

## Contents

- [Why WelkUI?](#why-welkui)
- [Components](#components)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Next.js](#nextjs-app-router)
- [Theming](#theming)
- [Showcase website](#showcase-website)
- [Development](#development)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [Publishing](#publishing)
- [License](#license)

## Why WelkUI?

<p align="center">
  <img src="./docs/images/features.png" alt="Feature cards: hand-drawn energy, built for React, thoughtful interactions" width="100%" />
</p>

|                                  |                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Hand-drawn energy**         | Uneven corners, bold outlines, hard comic shadows and the Short Stack font — bundled, no font service required.      |
| ⚛️ **Built for React**           | Typed props, forwarded refs, independent tree-shakeable exports and preserved `"use client"` boundaries for Next.js. |
| ♿ **Accessible by default**     | Native controls first, visible focus, labelled interactions, keyboard support and `prefers-reduced-motion`.          |
| 🧩 **Zero runtime dependencies** | React and React DOM are peer dependencies. Styles ship as CSS Modules extracted into one stylesheet.                 |
| 🎛️ **Themeable**                 | Override namespaced `--welk-*` CSS variables for colors, typography and borders. No global reset.                    |
| 📦 **Ready to ship**             | ESM build with type declarations, provenance publishing and package-content verification.                            |

## Components

<p align="center">
  <img src="./docs/images/playground.png" alt="Live WelkButton, WelkSwitch and WelkAccordion examples" width="100%" />
</p>

| Category                | Components                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | What you get                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **Actions**             | [`WelkButton`](https://ui.welkdock.com/components/WelkButton/), [`WelkIconButton`](https://ui.welkdock.com/components/WelkIconButton/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Tilted, hard-shadowed buttons and icon actions                              |
| **Forms & inputs**      | [`WelkInput`](https://ui.welkdock.com/components/WelkInput/), [`WelkCheckBox`](https://ui.welkdock.com/components/WelkCheckBox/), [`WelkRadio`](https://ui.welkdock.com/components/WelkRadio/), [`WelkRadioGroup`](https://ui.welkdock.com/components/WelkRadioGroup/), [`WelkSwitch`](https://ui.welkdock.com/components/WelkSwitch/), [`WelkDropDown`](https://ui.welkdock.com/components/WelkDropDown/), [`WelkDateInput`](https://ui.welkdock.com/components/WelkDateInput/), [`WelkDatePicker`](https://ui.welkdock.com/components/WelkDatePicker/), [`WelkTimePicker`](https://ui.welkdock.com/components/WelkTimePicker/), [`WelkRangeSlider`](https://ui.welkdock.com/components/WelkRangeSlider/), [`WelkOTPInput`](https://ui.welkdock.com/components/WelkOTPInput/), [`WelkAttachment`](https://ui.welkdock.com/components/WelkAttachment/) | Native, form-friendly controls with labels, validation and keyboard support |
| **Navigation**          | [`WelkMenu`](https://ui.welkdock.com/components/WelkMenu/), [`WelkBreadCrumbs`](https://ui.welkdock.com/components/WelkBreadCrumbs/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Comic navbars, nested/collapsible menus and breadcrumbs                     |
| **Overlays & feedback** | [`WelkDialog`](https://ui.welkdock.com/components/WelkDialog/), [`WelkDrawer`](https://ui.welkdock.com/components/WelkDrawer/), [`WelkSnackBar`](https://ui.welkdock.com/components/WelkSnackBar/), [`WelkTooltip`](https://ui.welkdock.com/components/WelkTooltip/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Modal dialogs, four-edge drawers, toasts and tooltips                       |
| **Display**             | [`WelkAccordion`](https://ui.welkdock.com/components/WelkAccordion/), [`WelkAvatar`](https://ui.welkdock.com/components/WelkAvatar/), [`WelkBadge`](https://ui.welkdock.com/components/WelkBadge/), [`WelkCard`](https://ui.welkdock.com/components/WelkCard/), [`WelkDivider`](https://ui.welkdock.com/components/WelkDivider/), [`WelkImage`](https://ui.welkdock.com/components/WelkImage/), [`WelkQRCode`](https://ui.welkdock.com/components/WelkQRCode/), [`WelkSticker`](https://ui.welkdock.com/components/WelkSticker/), [`WelkStickerCard`](https://ui.welkdock.com/components/WelkStickerCard/)                                                                                                                                                                                                                                             | Cards, stickers, badges, avatars, images, QR codes and disclosure           |

Each name links to its live page with every variant, a prop table and
copy-ready code. Detailed API notes live in [docs/COMPONENTS.md](./docs/COMPONENTS.md).

## Installation

> [!NOTE]
> `@welkui/react` is not on npm yet. Until the first release, install it from a
> local build as shown below.

**From npm** (after release):

```bash
npm install @welkui/react
# or
pnpm add @welkui/react
```

**From a local build** (works today):

```bash
# in this repository
pnpm install
pnpm build
pnpm pack                       # creates welkui-react-0.1.0.tgz

# in your React or Next.js app
npm install ../welkUI/welkui-react-0.1.0.tgz
```

Rebuild and re-pack after changing the library, then reinstall the `.tgz`.

**Requirements:** React 18.2+ or 19 · Node.js 20.19+ · ESM bundler (Vite, Next.js, etc.)

## Quick start

Import the stylesheet once, then use any component:

```tsx
import { useState } from "react";
import {
  WelkAccordion,
  WelkButton,
  WelkCheckBox,
  WelkInput,
} from "@welkui/react";
import "@welkui/react/styles.css";

export function Example() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WelkInput label="Hero name" placeholder="Your name..." />
      <WelkCheckBox label="Count me in" />
      <WelkButton onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </WelkButton>
      <WelkAccordion title="Learn more">A little playful detail.</WelkAccordion>
    </>
  );
}
```

The stylesheet applies the Short Stack font globally (headings, body and form
controls) and contains every component style and theme token. There is no CSS reset.

### Next.js App Router

Import the stylesheet in your root layout:

```tsx
// app/layout.tsx
import "@welkui/react/styles.css";
```

Interactive components keep their `"use client"` directive in the published
build, so you can render them from Server Components. Keep event handlers and
state inside your own Client Components — don't pass handlers from a Server
Component. See [examples/nextjs](./examples/nextjs) and
[examples/react-vite](./examples/react-vite).

## Theming

Override the namespaced CSS variables after importing the stylesheet:

```css
:root {
  --welk-color-accent: #ffda57;
  --welk-color-paper: #fffdf5;
  --welk-color-ink: #242424;
  --welk-font-family: "Short Stack", cursive, sans-serif;
}
```

Tokens, typography and reduced-motion-aware transitions live in
[src/theme](./src/theme). Short Stack is loaded from
[assets/font/short_stack](./assets/font/short_stack) and embedded in the built
stylesheet, so no external font service or separate font import is required.
Its SIL Open Font License is included in the package as `dist/fonts/ShortStack-OFL.txt`.
Override `--welk-font-family` to change the global font. The font contains only
a regular face; browsers synthesize bold text where requested.

## Showcase website

The website at **[ui.welkdock.com](https://ui.welkdock.com)** is built from
[examples/react-vite](./examples/react-vite) and doubles as the documentation.

<table>
  <tr>
    <td width="50%"><img src="./docs/images/explorer.png" alt="Component explorer with alphabetical menu and live WelkButton preview" /></td>
    <td width="50%"><img src="./docs/images/usage.png" alt="Usage code block with copy button and variant notes" /></td>
  </tr>
  <tr>
    <td align="center"><b>Component explorer</b><br />Alphabetical menu and one live component at a time</td>
    <td align="center"><b>Copy-ready usage</b><br />Code with a copy button, variants and props</td>
  </tr>
  <tr>
    <td width="50%"><img src="./docs/images/variants.png" alt="Visual variant gallery for WelkButton" /></td>
    <td width="50%"><img src="./docs/images/faq.png" alt="FAQ page with comic accordions" /></td>
  </tr>
  <tr>
    <td align="center"><b>Visual variant gallery</b><br />Live previews of every variant, for all 29 components</td>
    <td align="center"><b>FAQ</b><br />Short answers to common questions</td>
  </tr>
</table>

<details>
<summary><b>📱 Mobile view</b></summary>
<br />
<p align="center"><img src="./docs/images/mobile.png" alt="WelkUI website on a phone" width="320" /></p>
</details>

### Flutter Edition documentation

The website defaults to React Edition. Use the edition dropdown in the header
to open Flutter Edition at `/flutter/`, with matching components, FAQ, and
contributors pages. Edition-specific content and repository links are defined in
[editions.ts](./examples/react-vite/src/editions.ts).

The mobile-only Flutter package is developed separately in
[welkUI-flutter](https://github.com/welkdock/welkUI-flutter). Its documentation
lives here; contributors are loaded from that repository. The package is published
on pub.dev as [welkui_flutter](https://pub.dev/packages/welkui_flutter). Widget
docs (Dart usage, constructor parameters and notes) and the package version are
defined in [flutterWidgets.ts](./examples/react-vite/src/flutterWidgets.ts).
The field guide covers all 30 widgets in `welkui_flutter` 0.1.2, including
forms, pickers, navigation, overlays, images, stickers and QR codes.
After publishing a new release, update `flutterPackage.version` and any
changed widget APIs there.

#### Live mobile previews

Each Flutter widget page embeds the Flutter example app (built with
`flutter build web`) in a phone frame. The app loads only after the reader
clicks **Run live preview**, so the website stays light. Set the deployed app URL
in `flutterPreviewUrl` in
[flutterWidgets.ts](./examples/react-vite/src/flutterWidgets.ts). It must use
`https` (`http` is allowed only for `localhost`). While it is empty, pages show a
"preview coming soon" placeholder.

The website loads `<flutterPreviewUrl>?embed=1#/<route>`:

| Widget          | Route           |
| --------------- | --------------- |
| WelkAccordion   | `/accordion`    |
| WelkAttachment  | `/attachment`   |
| WelkAvatar      | `/avatar`       |
| WelkBadge       | `/badge`        |
| WelkBreadCrumbs | `/breadcrumbs`  |
| WelkButton      | `/button`       |
| WelkCard        | `/card`         |
| WelkCheckBox    | `/checkbox`     |
| WelkDateInput   | `/date-input`   |
| WelkDatePicker  | `/date-picker`  |
| WelkDialog      | `/dialog`       |
| WelkDivider     | `/divider`      |
| WelkDrawer      | `/drawer`       |
| WelkDropDown    | `/dropdown`     |
| WelkIconButton  | `/icon-button`  |
| WelkImage       | `/image`        |
| WelkInput       | `/input`        |
| WelkMenu        | `/menu`         |
| WelkOTPInput    | `/otp-input`    |
| WelkQRCode      | `/qr-code`      |
| WelkRadio       | `/radio`        |
| WelkRadioGroup  | `/radio-group`  |
| WelkRangeSlider | `/range-slider` |
| WelkSnackBar    | `/snackbar`     |
| WelkSticker     | `/sticker`      |
| WelkStickerCard | `/sticker-card` |
| WelkSwitch      | `/switch`       |
| WelkTabs        | `/tabs`         |
| WelkTimePicker  | `/time-picker`  |
| WelkTooltip     | `/tooltip`      |

Keep these routes in sync with `example/lib/widget_catalog.dart` in the
Flutter repository when adding widgets. This catalogue also drives the website's
navigation, edition switching, SEO routes and pre-rendered pages.

In the example app, use hash-based routes and read
`Uri.base.queryParameters['embed'] == '1'` to hide the app's own navigation.
`embed` sits before the `#`, so it is a real query parameter. The app's host must
allow being framed by `ui.welkdock.com`; don't send `X-Frame-Options: DENY`.

<details>
<summary><b>🔎 SEO and deployment details</b></summary>

- Clean URLs (`/components/WelkButton/`); legacy `#/` links redirect.
- Each route is pre-rendered to static HTML with a unique title, description,
  canonical URL, Open Graph/Twitter card and JSON-LD (WebSite,
  SoftwareSourceCode, TechArticle, FAQPage, BreadcrumbList).
- The build also emits `404.html` (noindex), `sitemap.xml`, `robots.txt`,
  `site.webmanifest` and `CNAME`.
- [.github/workflows/pages.yml](./.github/workflows/pages.yml) deploys to GitHub
  Pages on every push to `main`. Set **Settings → Pages → Source** to _GitHub
  Actions_ and point a `ui` CNAME DNS record at `welkdock.github.io`.
- Change the domain in
  [siteContent.ts](./examples/react-vite/src/siteContent.ts).

</details>

## Development

Use Node.js 20.19+ (24 recommended) and pnpm 10.20.0. Without a global pnpm,
prefix commands with `npx pnpm@10.20.0`.

```bash
pnpm install
pnpm storybook                                   # Storybook on http://localhost:6006
pnpm build                                       # library build + type declarations
pnpm --filter @welkui/example-react-vite dev     # showcase website
pnpm --filter @welkui/example-nextjs dev         # Next.js example
```

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `pnpm check`           | ESLint, TypeScript and Vitest                      |
| `pnpm test:watch`      | Tests in watch mode                                |
| `pnpm format`          | Prettier                                           |
| `pnpm verify:package`  | npm contents, CSS, externals and client boundaries |
| `pnpm build:examples`  | Build both examples (run `pnpm build` first)       |
| `pnpm build-storybook` | Static Storybook                                   |

The examples consume the **built** package through workspace links, so rebuild
the library after changing its source. Showcase tests resolve `@welkui/react`
to `src/` and don't need a build.

## Project structure

```text
welkUI/
├── src/
│   ├── components/      # one folder per component: .tsx, .types.ts, .module.css, .test.tsx, .stories.tsx
│   ├── theme/           # tokens, typography, animations
│   ├── styles/          # package stylesheet entry
│   ├── hooks/ utils/ primitives/ types/
│   └── index.ts         # public exports
├── examples/
│   ├── react-vite/      # showcase website (ui.welkdock.com)
│   └── nextjs/          # Next.js App Router consumer
├── assets/              # fonts, favicons, images
├── docs/                # API reference and README images
├── .storybook/          # Storybook config
├── scripts/             # release and package verification
└── .github/             # CI, publishing, Pages, issue and PR templates
```

## Contributing

Contributions of every size are welcome — bug fixes, new components, docs and
ideas. Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** first.

1. Find or open an [issue](https://github.com/welkdock/welkUI/issues) and comment to claim it.
2. Branch with the issue number: `feat/42-welk-tabs`.
3. Reference the issue in commits and the pull request: `Closes #42`.
4. Run `pnpm format && pnpm check && pnpm build` before pushing.

### Contributors

<a href="https://github.com/welkdock/welkUI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=welkdock/welkUI" alt="WelkUI contributors" />
</a>

## Publishing

The package is configured but has not been published by this scaffold.

1. Ensure you control the `@welkui` npm organization and can publish `@welkui/react`.
2. For the first release, run `pnpm check`, `pnpm build`, `pnpm verify:package`,
   `pnpm build:examples` and `pnpm build-storybook`, then authenticate to npm and run
   `npm publish --access public` locally.
3. Configure an npm **trusted publisher** for this GitHub repository, the
   `publish.yml` workflow, and the `npm` GitHub environment. Configure that environment
   with any desired reviewer/tag protections. CI uses OIDC, not a stored npm token.
4. For subsequent releases, start from a clean worktree and run
   `pnpm release 0.2.0`. Review the version/lockfile changes and update
   [CHANGELOG.md](./CHANGELOG.md), then commit and push a matching `v0.2.0` tag.

The publish workflow verifies the tag/version match, validates the library and
consumer builds, and publishes with provenance. `npm pack` and `npm publish`
also rebuild and verify the package through `prepack`.

## License

[MIT](./LICENSE) © WelkDock Technologies. The bundled Short Stack font is
licensed under the [SIL Open Font License](./assets/font/short_stack/OFL.txt).

<p align="center">
  <br />
  <a href="https://www.welkdock.com"><b>A Product of WelkDock Technologies</b></a>
  <br />
  <sub>Made with ink, coffee and a little comic relief.</sub>
</p>
