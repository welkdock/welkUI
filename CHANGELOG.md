# Changelog

## 0.1.0 - Unreleased

- Add WelkQRCode to generate accessible SVG QR codes for valid HTTP(S) URLs,
  bundling the QR generator in the library.

- Rewrite the README with a banner, badges, website screenshots and a
  component overview; move detailed API notes to `docs/COMPONENTS.md`.
  Expand the contribution guide with an issue-linked workflow and add issue
  and pull request templates.

- Add SEO to the demo website: clean pre-rendered URLs, per-page metadata,
  canonical links, Open Graph/Twitter cards, JSON-LD, sitemap, robots.txt,
  web manifest and a GitHub Pages deployment workflow.

- Add interactive visual variant/state galleries for all 28 demo components,
  expanded usage/accessibility guidance, and React branding on the landing page.

- Add copyable usage snippets and full component descriptions, variant guides,
  and typed prop references to every entry in the demo explorer.

- Redesign the React demo as a WelkUI landing site with an alphabetical,
  single-component explorer, concise code examples, FAQ and contributor credits.

- Add WelkMenu navbar with comic text, line separators, forward icons and a
  recursive nested disclosure variant with downward icons and native links.

- Add WelkDrawer with four edge placements, comic slide animations, native modal
  focus management, Escape/close dismissal and optional backdrop dismissal.

- Add WelkBreadCrumbs, WelkBadge and WelkSwitch with slightly distorted comic
  shapes, accessible navigation/labels and native switch keyboard/form support.

- Show local image thumbnails and compact video/audio previews in WelkAttachment,
  with decode-error messages and automatic object URL cleanup.

- Add WelkAttachment with native file selection, optional per-file byte and count
  limits, accepted file types, validation messages and clear/reset support.

- Add WelkSnackBar with six viewport positions, comic squash-and-pop entrance/exit
  animations, semantic colors, accessible dismissal and optional auto-hide.

- Add WelkStickerCard with an oversized animated sticker overlapping the left
  edge and corners, reusing native card interactions and sticker outline options.

- Add WelkDropDown with native selection and optional built-in searchable
  listbox, keyboard navigation and controlled/uncontrolled form support.

- Add WelkTimePicker with custom scrollable 24-hour/minute wheels, optional
  seconds, manual text entry and keyboard/form support.

- Add WelkRangeSlider with a slightly distorted straight track, comic thumb,
  native range semantics and numeric value callbacks.

- Add WelkSticker with a thick white silhouette outline and a load-triggered
  sticking animation respecting reduced-motion preferences.

- Add WelkDivider with horizontal/vertical orientation, plain/dotted/dashed
  lines and configurable pixel thickness.

- Add WelkOTPInput with six configurable comic digit boxes, numeric paste,
  one-time-code autofill, controlled values and completion callbacks.

- Add WelkDateInput with an editable field and calendar icon that opens the custom
  date picker, keyboard access and selection/Escape/outside dismissal.

- Add WelkDatePicker with a full-month comic calendar, editable top date field,
  keyboard navigation, date limits and controlled/uncontrolled form support.

- Add WelkTooltip with thinking/speech bubbles, animated comic entrances,
  hover/focus activation, Escape dismissal and reduced-motion support.

- Add WelkIconButton with a distorted square icon-only default, a labeled text
  variant and accessible native button interactions.

- Add WelkCard with title/subtitle, a top-right icon, native click/keyboard behavior
  and default hover growth respecting reduced-motion preferences.

- Add WelkImage with network/asset variants, comic framing, customizable network
  fallback and a bundled comic background default.

- Add WelkRadio and WelkRadioGroup with hand-drawn circles, native keyboard/form
  behavior and controlled/uncontrolled selection. Restyle checkboxes as slightly
  distorted squares, preserving checked, indeterminate and disabled states.

- Give buttons and dialogs slightly distorted, hand-drawn shapes. Remove the
  `borderStyle` and `dottedBorder` APIs; all component borders are solid.

- Use an orange warning palette for dialogs and buttons.

- Add WelkDialog with five semantic variants, native modal focus/Escape behavior,
  optional backdrop dismissal, and customizable default/confirmation actions.

- Add accordion `fixedWidth` with text wrapping and a responsive parent-width cap.

- Animate accordion expansion and collapse in supporting browsers, respecting
  reduced-motion preferences.

- Add vertical (default), horizontal and nested accordion layouts with opt-in
  `closeOnOutsideClick` dismissal for mouse, touch and pen interactions.

- Add opt-in `growOnHover` avatar scaling with reduced-motion support.

- Add a customizable avatar background via the `color` prop and Storybook color control.

- Add WelkAvatar with four bundled user/admin portraits, custom images/icons,
  accessible names, three sizes and comic-themed framing.

- Add optional custom end-icon actions to WelkInput with accessible labels,
  keyboard activation and disabled support.

- Add WelkInput with comic-themed styling, accessible labels, native text input
  behavior, focus/disabled/read-only/invalid states, tests and Storybook examples.

- Add error, warning, ghost, info and success button variants with themed hover
  states. Keep primary as the default and retain secondary for compatibility.

- Apply the bundled Short Stack font globally through the package stylesheet,
  including its SIL Open Font License in the build.

- Scaffold the `@welkui/react` ESM package with Vite, TypeScript declarations,
  external React peers and preserved Next.js client boundaries.
- Add WelkButton, WelkCheckBox and WelkAccordion with CSS Modules, theme tokens,
  native accessible interactions, tests and stories.
- Add React/Vite and Next.js App Router consumers, CI, package verification and
  trusted npm publishing configuration.
