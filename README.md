<div align="center">

<a href="https://ui.welkdock.com">
  <img src="https://raw.githubusercontent.com/welkdock/welkUI/main/docs/images/banner.png" alt="WelkUI — comic-inspired React component library" width="820" />
</a>

<h3>Serious building. Playful interfaces.</h3>

<p>
  An open-source React + TypeScript UI library for comical minds.<br />
  Hand-drawn outlines, hard shadows, bundled typography, and accessible components for React and Next.js.
</p>

<p>
  <b>For full documentation, live previews, and API references, visit
  <a href="https://ui.welkdock.com">ui.welkdock.com</a>.</b>
</p>

</div>

## Components

| Category                | Components                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Actions**             | [WelkButton](https://ui.welkdock.com/components/WelkButton/), [WelkIconButton](https://ui.welkdock.com/components/WelkIconButton/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Forms & inputs**      | [WelkInput](https://ui.welkdock.com/components/WelkInput/), [WelkCheckBox](https://ui.welkdock.com/components/WelkCheckBox/), [WelkRadio](https://ui.welkdock.com/components/WelkRadio/), [WelkRadioGroup](https://ui.welkdock.com/components/WelkRadioGroup/), [WelkSwitch](https://ui.welkdock.com/components/WelkSwitch/), [WelkDropDown](https://ui.welkdock.com/components/WelkDropDown/), [WelkDateInput](https://ui.welkdock.com/components/WelkDateInput/), [WelkDatePicker](https://ui.welkdock.com/components/WelkDatePicker/), [WelkTimePicker](https://ui.welkdock.com/components/WelkTimePicker/), [WelkRangeSlider](https://ui.welkdock.com/components/WelkRangeSlider/), [WelkOTPInput](https://ui.welkdock.com/components/WelkOTPInput/), [WelkAttachment](https://ui.welkdock.com/components/WelkAttachment/) |
| **Navigation**          | [WelkMenu](https://ui.welkdock.com/components/WelkMenu/), [WelkBreadCrumbs](https://ui.welkdock.com/components/WelkBreadCrumbs/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Overlays & feedback** | [WelkDialog](https://ui.welkdock.com/components/WelkDialog/), [WelkDrawer](https://ui.welkdock.com/components/WelkDrawer/), [WelkSnackBar](https://ui.welkdock.com/components/WelkSnackBar/), [WelkTooltip](https://ui.welkdock.com/components/WelkTooltip/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Display**             | [WelkAccordion](https://ui.welkdock.com/components/WelkAccordion/), [WelkAvatar](https://ui.welkdock.com/components/WelkAvatar/), [WelkBadge](https://ui.welkdock.com/components/WelkBadge/), [WelkCard](https://ui.welkdock.com/components/WelkCard/), [WelkDivider](https://ui.welkdock.com/components/WelkDivider/), [WelkImage](https://ui.welkdock.com/components/WelkImage/), [WelkQRCode](https://ui.welkdock.com/components/WelkQRCode/), [WelkSticker](https://ui.welkdock.com/components/WelkSticker/), [WelkStickerCard](https://ui.welkdock.com/components/WelkStickerCard/)                                                                                                                                                                                                                                       |

## Installation

```bash
npm install @welkui/react
```

Requires React 18.2+ or 19, Node.js 20.19+, and an ESM bundler such as Vite or Next.js.

## Quick start

Import the stylesheet once, then use any component:

```tsx
"use client";

import { useState } from "react";
import { WelkButton, WelkCard } from "@welkui/react";
import "@welkui/react/styles.css";

export function Example() {
  const [count, setCount] = useState(0);

  return (
    <>
      <WelkCard
        title="Hello, hero."
        subtitle="Your next great interface starts here."
      />
      <WelkButton onClick={() => setCount((value) => value + 1)}>
        Clicked {count} times
      </WelkButton>
    </>
  );
}
```

For Next.js App Router, import the stylesheet in your root layout and keep state
and event handlers in Client Components.

## Theming

Override the CSS variables after importing the stylesheet:

```css
:root {
  --welk-color-accent: #ffda57;
  --welk-color-paper: #fffdf5;
  --welk-color-ink: #242424;
  --welk-font-family: "Short Stack", cursive, sans-serif;
}
```

The stylesheet includes the Short Stack font and applies global typography.
No external font service or separate font import is needed.

For complete guides, component variants, and detailed API documentation, visit
**[ui.welkdock.com](https://ui.welkdock.com)**.

## License

[MIT](./LICENSE) © WelkDock Technologies. The bundled Short Stack font is licensed
under the [SIL Open Font License](https://github.com/welkdock/welkUI/blob/main/assets/font/short_stack/OFL.txt),
included in the package as `dist/fonts/ShortStack-OFL.txt`.

<p align="center">
  <br />
  <a href="https://www.welkdock.com"><b>A Product of WelkDock Technologies</b></a>
  <br />
  <sub>Made with ink, coffee and a little comic relief.</sub>
</p>
