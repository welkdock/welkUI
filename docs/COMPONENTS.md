# WelkUI component API

Detailed props, behavior notes and examples for every `@welkui/react`
component. For live previews, every variant and copy-ready snippets, open the
[component explorer](https://ui.welkdock.com/components/).

[← Back to README](../README.md)

## Data display

### WelkDataTable

A native, accessible table with bold comic headers, dashed row separators,
asymmetric corners, solid offset shadows, and the bundled Short Stack font.
Column and row types are inferred from your dataset.

```tsx
import { WelkBadge, WelkDataTable } from "@welkui/react";
import type { WelkDataTableColumn } from "@welkui/react";

interface Mission {
  id: string;
  name: string;
  points: number;
}

const missions: Mission[] = [
  { id: "M1", name: "Rescue the moon", points: 90 },
  { id: "M2", name: "Find the missing ink", points: 40 },
  { id: "M3", name: "Catch the plot twist", points: 75 },
];

const columns: WelkDataTableColumn<Mission>[] = [
  { id: "name", header: "Mission", accessor: (row) => row.name },
  {
    id: "points",
    header: "Points",
    accessor: (row) => row.points,
    cell: (row) => <WelkBadge>{row.points} pts</WelkBadge>,
    align: "right",
  },
];

<WelkDataTable
  caption="Mission board"
  data={missions}
  columns={columns}
  getRowId={(row) => row.id}
  getRowLabel={(row) => row.name}
  searchable
  selectable
  pageSize={2}
/>;
```

#### Columns and customization

Each column requires a unique, non-empty `id`, a `header: ReactNode`, and an
`accessor: (row: T) => string | number | boolean | null | undefined`. Accessor
values drive search, sort, and default cell rendering. `null`/`undefined` render
as empty text. Use `cell: (row: T) => ReactNode` for links, badges, formatted
values, or action buttons; it does not change the search/sort value.

Optional column properties:

- `sortable` and `searchable` default to `true`. Disable them for action columns
  or content that should not participate in search.
- `compare: (a: T, b: T) => number` supplies a custom ascending comparator.
  Numbers otherwise sort numerically; other values use English,
  case-insensitive natural ordering. Nullish values sort last ascending and first
  descending. Sorting is stable and never mutates the source array.
- `align: "left" | "center" | "right"` aligns header and cell content.
- `width: CSSProperties["width"]` sets a preferred column width.

`density` is `"comfortable"` (default) or `"compact"`. `striped` defaults to
`true`; set it to `false` for plain paper rows. `className`, native div attributes,
and `style` target the outer panel. `getRowClassName(row)` styles individual data
rows. Theme colors, typography, outlines, and shadows use the shared CSS tokens.
Wide content scrolls horizontally in a keyboard-focusable region.

#### Sorting, search and pagination

Enable or disable table features independently:

```tsx
<WelkDataTable
  caption="Mission board"
  data={missions}
  columns={columns}
  getRowId={(row) => row.id}
  searchable={false}
  sortable={false}
  selectable={false}
/>
```

`searchable` (default `false`) controls the search field and filtering.
`sortable` (default `true`) controls all sorting buttons and data sorting.
`selectable` (default `false`) controls row and select-all checkboxes.
When `sortable={false}`, `sort` and `defaultSort` are ignored, and headers have
no sort indicators. Re-enabling sorting restores the supplied or previous sort.
Per-column `sortable={false}` continues to opt individual columns out when
table-wide sorting is enabled.

Sortable header buttons cycle ascending, descending, then unsorted, updating
`aria-sort`. Use `defaultSort={{ columnId: "points", direction: "desc" }}` for
initial ordering, or `sort` and `onSortChange` to control it. Set controlled
`sort={null}` to restore dataset order. The sort must reference a sortable column.

`searchable` defaults to `false`. When enabled, a visible `"Search table"` field
matches text across searchable accessor values, ignoring case and trimming the
query. Customize `searchLabel` and `searchPlaceholder`, initialize with
`defaultSearch`, or control with `search` and `onSearchChange`. Controlled values
must be updated by the consumer after callbacks.

`pagination` defaults to `true`, with `pageSize={10}`. A positive integer page
size is required. Search and sort changes return to the first page; data
shrinkage clamps the current page. Set `pagination={false}` to render all
matching rows. Filtering and sorting happen before pagination.
Previous/next controls are backward/forward icon buttons with accessible labels.

#### Row selection

`selectable` defaults to `false`. `getRowId` must return a unique, stable,
non-empty string or finite number. Keep ids consistent across data updates.
`getRowLabel` customizes accessible checkbox names; it defaults to the row id.
The header checkbox selects/deselects only the visible page and shows a mixed
state for partial selection. Selection is preserved across pages, sorting, and
search. Selected rows have a light-yellow background. Removed dataset ids are excluded from the selection count and subsequent
callbacks.

Initialize with `defaultSelectedRowIds`, or control selection with
`selectedRowIds` and `onSelectionChange`. The callback receives the selected ids
from the entire current dataset, not just the visible page:

```tsx
const [selected, setSelected] = useState<(string | number)[]>([]);

<WelkDataTable
  caption="Mission board"
  data={missions}
  columns={columns}
  getRowId={(row) => row.id}
  selectable
  selectedRowIds={selected}
  onSelectionChange={setSelected}
/>;
```

#### Loading and empty states

`loading` replaces rows with a status message and disables search, sorting,
selection, and pagination controls. Customize `loadingMessage` (default
`"Loading the next chapter..."`), `emptyMessage` for an empty dataset (default
`"No rows yet. The story starts here."`), and `noResultsMessage` for unmatched
searches (default `"No matching rows. Try another clue."`). All accept
`ReactNode`. Async errors and fetching belong to the application; do not disguise
errors as empty data.

The component uses native table, caption, column headers, checkboxes, and buttons,
not an ARIA grid. Tab/Enter/Space operate controls; custom cells should retain
their native keyboard behavior. The generic component does not expose a ref.
All processing is client-side: supply the complete, reasonably sized dataset.
Server-side data controls, column resizing/reordering, and virtualization are
not part of this component.

## Navigation, overlays and feedback

### Menu / navbar

```tsx
import { WelkMenu } from "@welkui/react";

<WelkMenu
  variant="nested"
  activeRoute="/heroes/superman"
  items={[
    { title: "Home", route: "/" },
    {
      title: "Heroes",
      route: "/heroes",
      children: [
        { title: "Superman", route: "/heroes/superman" },
        { title: "Batman", route: "/heroes/batman" },
      ],
    },
  ]}
/>;
```

The default variant renders a vertical menu of top-level routes:
comic text separated by lines, with forward icons and no underlines.
`variant="nested"` enables recursive child lists; items with children use a
downward disclosure icon. Their dropdown includes a "Go to [title]" link so the
parent route stays accessible. All child levels expand inline below their parent.
`activeRoute` marks exact matching links as the current page.

Uses native anchors and details/summary disclosures, not application-menu ARIA
roles. Tab navigates links/triggers; Enter/Space toggles a disclosure; Escape
closes the nearest open level and restores its trigger focus. Outside clicks,
focus leaving the navigation and following a link dismiss open lists.
Nav props/ref, `className` and a custom `aria-label` are supported. Routes use
native navigation (no router dependency). Set `collapsible` to show an icon button
that hides/shows the entire menu (expanded initially). Its accessible label and
`aria-expanded` track the state. Escape closes the nearest child level first,
then collapses the whole menu and focuses the toggle. Without `collapsible`,
the entire menu stays visible. Width defaults to 18rem, capped at the container;
use `style` or `className` to override it.
The whole menu folds smoothly with a subtle comic squash/bounce and rotating
toggle icon. Collapsed content is inert and hidden from assistive technology
immediately, even during the closing animation. Reduced-motion preferences
disable the transitions.

### Drawer

```tsx
<WelkDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  title="Your next adventure"
  position="right"
  closeOnTapOutside
>
  <p>Your drawer content goes here.</p>
</WelkDrawer>
```

`position` supports `left`, `right` (default), `top` and `bottom`. The slightly
uneven comic panel slides from the selected edge and respects reduced motion.
`open` is controlled; set it to `false` in `onClose` to dismiss. Includes a close
button (`closeLabel="Close drawer"`), Escape dismissal, and optional
`closeOnTapOutside` (default `false`). Backdrop dismissal requires a press and
release outside, so dragging out of the panel does not dismiss it.

Uses a native modal dialog for focus containment, inert background content,
top-layer rendering and focus restoration. Background scrolling is locked while
open; the 200ms exit completes before native modal dismissal restores focus.
Side drawers fill viewport height; top/bottom drawers fit content up to 80% of
viewport height, with scrolling for overflow. `className` applies to the dialog
for sizing overrides. Keep the component mounted while changing `open` to retain
the exit animation.

### Breadcrumbs, badges and switches

```tsx
import { WelkBreadCrumbs, WelkBadge, WelkSwitch } from "@welkui/react";

<WelkBreadCrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Heroes", href: "/heroes" },
    { label: "Superman" },
  ]}
/>;

<WelkBadge variant="success" size="md">
  Ready!
</WelkBadge>;

<WelkSwitch
  label="Activate hero mode"
  defaultChecked
  name="heroMode"
  onCheckedChange={(checked) => console.log(checked)}
/>;
```

`WelkBreadCrumbs` renders a labeled navigation landmark and ordered list with
the last item marked `aria-current="page"`. Items accept a `label`, optional
`href`, and native anchor props (for linked items). Unlinked items are text.
`separator` defaults to `/` and is decorative; customize the navigation name with
`aria-label`. Native nav props/ref are forwarded. Long trails wrap, rather than
being collapsed or truncated. Links use native anchors; no routing dependency is required.

`WelkBadge` is a noninteractive inline label or count. Variants: `default`,
`info`, `success`, `warning`, `error`; sizes: `sm`, `md` (default), `lg`.
Accepts native span props/ref. Use meaningful text rather than color alone;
add `role="status"` explicitly if updates should be announced. It does not
automatically overlay another component or cap numeric counts.

`WelkSwitch` uses a native checkbox with `role="switch"` and a required visible
`label`. Its track is a regular pill with a circular thumb, without distortion
or rotation. Supports `checked`/`onCheckedChange`, `defaultChecked`, native `onChange`,
input props/ref (including `name`, `value`, `required`, `disabled`) and native
form submission/reset. `className` applies to the input, as with `WelkCheckBox`.
Space toggles it; focus, forced colors and reduced-motion preferences are supported.

### Attachments

```tsx
import { WelkAttachment } from "@welkui/react";

<WelkAttachment
  label="Attach your files"
  name="attachments"
  maxFiles={3}
  maxFileSize={5 * 1024 * 1024}
  accept="image/*,.pdf"
  onFilesChange={(files) => console.log(files)}
/>;
```

`maxFileSize` is the maximum **bytes per file**, inclusive; `maxFiles` limits
the number selected. Both are optional (unlimited by default). `multiple`
defaults to `true`; set `false` for a single file. `accept` supports comma-separated
extensions, MIME types and MIME wildcards. The component lists filenames/sizes
and provides a clear-all button.
Images show small thumbnails; video and audio files get compact native players
without autoplay. Unsupported/corrupt media shows a preview-unavailable message.
Other types (including PDF/Office documents) remain filename/size entries, not
embedded documents. Previews stay local using temporary object URLs, released
when a file is replaced, cleared, reset or unmounted.

Each picker selection **replaces** the previous selection, rather than appending.
An invalid batch is rejected entirely, clears the previous selection/native input,
announces the error, and calls `onFilesChange([])`. Valid selection and clearing
also call `onFilesChange`; `onChange` is the native picker event. Native form reset
clears the list without firing selection callbacks. Files remain in the native
input for `FormData`/multipart submission. Supports native input props (including
`required`, `disabled`, `form`, `name`) and an input ref; `className` styles the wrapper.
The component does not upload files or inspect their contents. Validate size,
count and actual file types on your server too; browser metadata is untrusted.

### Snackbar

```tsx
import { useState } from "react";
import { WelkButton, WelkSnackBar } from "@welkui/react";

function NotificationDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WelkButton onClick={() => setOpen(true)}>Save</WelkButton>
      <WelkSnackBar
        open={open}
        onClose={() => setOpen(false)}
        message="POW! Your changes are saved."
        position="bottom-middle"
        variant="success"
        autoHideDuration={5000}
      />
    </>
  );
}
```

Positions: `top-left`, `top-middle`, `top-right`, `bottom-left`, `bottom-middle`
(default), and `bottom-right`. The comic burst, uneven frame and squash/pop
entrance and exit respect reduced-motion preferences. Variants are `default`,
`info`, `success`, `warning` and `error`.

`open` is controlled: `onClose` requests dismissal; update `open` to hide it.
`autoHideDuration` is milliseconds and defaults to `0` (manual dismissal).
The timer pauses while hovered or focused and restarts for the full duration
when interaction ends. The close button uses `closeLabel` (default
"Dismiss notification"); Escape also requests dismissal when the close button is focused.
Notifications announce their message politely without stealing focus.
The snackbar portals into `document.body` after mounting, avoiding ancestor
clipping and supporting Next.js hydration. Closing retains a noninteractive
exit frame for 200ms. Render one at a time per position; stacking/queuing is
not automatic. Import the package stylesheet once as usual.

### Sticker card

```tsx
import { WelkStickerCard } from "@welkui/react";

<WelkStickerCard
  title="A super adventure"
  subtitle="Your next mission starts here."
  sticker={{ src: "/superman.png", alt: "", outlineThickness: 6 }}
  onClick={() => console.log("Start mission")}
/>;
```

An oversized sticker overlaps the card's left edge and extends beyond its top
and bottom corners. Transparent images with artwork filling the image bounds
give the best silhouette; transparent padding and the image's shape affect
visual coverage. Leave space around the card and avoid clipping overflow.
The sticker is decorative (hidden from assistive technology); put meaningful
information in the title/subtitle. `sticker` accepts the existing sticker
image, fallback, outline and load/error options, with sizing managed by the card.
All `WelkCard` props, including `icon`, `growOnHover`, native button attributes,
disabled state and button ref, remain supported.
Hovering the card or sticker grows the entire joined component. Set
`growOnHover={false}` to disable this; disabled controls and reduced-motion
preferences also suppress growth. Independent sticker hover elevation is
suppressed inside the card so both pieces stay joined.

### Dropdown

```tsx
import { WelkDropDown } from "@welkui/react";

<WelkDropDown
  label="Choose your hero"
  name="hero"
  searchable
  options={[
    { value: "superman", label: "Superman" },
    { value: "batman", label: "Batman" },
    { value: "flash", label: "Flash", disabled: true },
  ]}
  onValueChange={(value) => console.log(value)}
/>;
```

`searchable` defaults to `false`, using a styled native select. Set it to `true`
for an editable combobox with built-in case-insensitive label filtering; no
search dependency is required. Typing only filters: click a result or use
Up/Down and Enter to commit a value. Home/End navigate the open list; Escape,
Tab and outside clicks dismiss it without changing the selection.

Use unique, nonempty string option values (`""` is reserved for the placeholder).
Supports `value`/`onValueChange`, `defaultValue`, `placeholder`, `disabled`,
`required`, `name`, `id` and `className`. The forwarded ref always targets the
native select, which supplies form submission, reset and required validation
in both modes. In searchable mode, invalid submission focuses the visible input.
The popup is inline; allow room below and avoid clipping overflow containers.

## Component reference

Components use solid borders, except `WelkDivider`, which also supports dotted
and dashed lines. Buttons have uneven corners and a slight tilt;
dialogs use asymmetric hand-drawn corners, including their close buttons.
The former `borderStyle` and `dottedBorder` props have been removed; remove them
from existing usages.

### WelkTimePicker

A comic-styled time picker with custom scrollable hour/minute wheels and optional
seconds. Scroll a wheel and click a number, or focus it and use Up/Down, Home/End.
The top field supports manual entry; no native browser time picker is used.

```tsx
import { WelkTimePicker } from "@welkui/react";

<WelkTimePicker label="Adventure time" defaultValue="14:30" onValueChange={setTime} />
<WelkTimePicker label="Precise time" showSeconds defaultValue="14:30:15" />
```

Use 24-hour `HH:mm` values, or `HH:mm:ss` when `showSeconds` is true (false by
default). `value`/`onValueChange` support controlled state; `defaultValue` supports
uncontrolled state. An empty string clears the selection; wheels initially show
zero and the first wheel selection commits a complete time. Invalid/partial text
remains editable and blocks form submission without firing `onValueChange`.
Invalid value props throw a `RangeError`. `name`, `required`, `disabled`, form
reset, input refs and outer `className` are supported. No timezone conversion
is performed. When toggling seconds, provide values matching the new format.

### WelkRangeSlider

A native range slider with a slightly uneven straight comic track and an
irregular yellow thumb.

```tsx
import { WelkRangeSlider } from "@welkui/react";

<WelkRangeSlider
  label="Hero power"
  min={0}
  max={100}
  step={5}
  defaultValue={50}
  onValueChange={(value) => console.log(value)}
/>;
```

Defaults are `min={0}`, `max={100}`, `step={1}`. Use numeric `value` and
`onValueChange` for controlled state or `defaultValue` for uncontrolled state.
Native `onChange`, keyboard controls (arrows, Home/End), form submission/reset,
`disabled`, input refs and ARIA attributes are supported. `className` and `style`
target the input; the track fills its container. Forced-colors mode uses the
browser's native range appearance for contrast.

### WelkSticker

Set `elevateOnHover` to lift the loaded sticker and deepen its shadow on hover.
It defaults to `false`, applies only on hover-capable devices, and respects
reduced-motion preferences without changing the sticking entrance animation.

An image with a thick white cutout outline, soft ink shadow and a sticking-on
entrance animation triggered when the image finishes loading.

```tsx
import { WelkSticker } from "@welkui/react";
import hero from "./assets/hero.png";

<WelkSticker src={hero} alt="Hero sticker" width={160} height={160} />;
```

Use transparent PNG/WebP/SVG images for a silhouette-following sticker outline.
Opaque images (including JPEGs) get an outline around their rectangular image;
the component does not remove backgrounds. Customize the outline with
`outlineThickness={10}` (non-negative pixels, default `6`; `0` removes it) and
`outlineColor="#ffda57"` (default `"white"`). The outline uses an SVG
dilation filter, so it also works with remote URLs without canvas pixel access.
Native image attributes, refs, `onLoad`, `onError`, `className` and `style` target
the image. Allow room for its outline and tilt; avoid clipping ancestors.
Changing `src`, `srcSet` or `sizes` restarts loading/animation. Cached images are
supported, reduced-motion preferences disable the entrance, and failed loads
show an error message instead of playing the animation.
Pass `fallbackSrc` to try a backup image once if the original fails. Its successful
load plays the sticking animation; if the backup also fails, the error is shown.
`onError` is called for each failed attempt. The superhero demos use local
Superman/Batman images with a comic background fallback.

### WelkDivider

A simple line separator with horizontal (default) or vertical orientation.

```tsx
import { WelkDivider } from "@welkui/react";

<WelkDivider />
<WelkDivider variant="dotted" thickness={3} />
<WelkDivider variant="dashed" thickness={4} />
<WelkDivider orientation="vertical" thickness={2} style={{ height: 80 }} />
```

`variant` accepts `"plain"` (default), `"dotted"` and `"dashed"`. `thickness`
defaults to 2 pixels and must be a positive finite number, including fractions.
Horizontal lines fill their container width; vertical lines default to 2rem tall.
Set `style.width` or `style.height` to change the line length, and
`style.borderColor` to change its ink color. Explicit styles override defaults.
Native div attributes, refs and `className` are forwarded. The line has
`role="separator"` and the matching `aria-orientation`.

### WelkOTPInput

Comic-style OTP boxes backed by one accessible native text input for keyboard
editing, copy/paste and SMS autofill.

```tsx
import { WelkOTPInput } from "@welkui/react";

<WelkOTPInput
  label="Verification code"
  length={6}
  onValueChange={setCode}
  onComplete={(code) => verifyCode(code)}
/>;
```

`length` defaults to 6 and must be a positive integer. Only numeric digits are
accepted, preserving leading zeros. Pasted separators are removed and the code
is capped to the configured length. Use `value` for controlled state or
`defaultValue` for uncontrolled state; both must contain only digits and fit the
length. `onComplete` fires when a changed value reaches the full length.
The input defaults to `autoComplete="one-time-code"` and `inputMode="numeric"`.
Native `name`, form reset, `required`, `disabled`, `readOnly`, input refs and
ARIA attributes are supported. Nonempty incomplete codes fail form validation.
`className` targets the outer field. The visible boxes are decorative; keyboard
navigation and selection operate on the single input.

### WelkDateInput

A compact editable date field that opens the same custom comic calendar as
`WelkDatePicker`, without using a browser date picker.

```tsx
import { WelkDateInput } from "@welkui/react";

<WelkDateInput
  label="Adventure date"
  defaultValue="2026-10-22"
  name="adventureDate"
  onValueChange={(date) => console.log(date)}
/>;
```

Focus/click the field or click its calendar icon to open. Selecting a day closes
the calendar and returns focus to the field. Escape, outside clicks, and moving
focus outside dismiss it. ArrowDown from the field moves focus to the selected
day (or today, bounded by limits). It supports the same values, limits, manual
`YYYY-MM-DD` editing, validation, refs and form behavior as `WelkDatePicker`.
Pass `circularMarking` to mark the selected day with a hand-drawn pen circle in
the popup calendar. It defaults to `false`, preserving the filled highlight.
The circle defaults to red; use `circularMarkingColor` to customize its CSS color.
The dropdown is positioned below the input; allow room and avoid clipping
ancestors with `overflow: hidden`.

### WelkDatePicker

A comic-styled inline calendar showing every date in the displayed month, with
previous/next month navigation and a custom text field at the top. No native
browser date picker is used.

```tsx
import { WelkDatePicker } from "@welkui/react";

<WelkDatePicker
  label="Adventure date"
  defaultValue="2026-10-22"
  name="adventureDate"
  min="2026-01-01"
  max="2026-12-31"
  circularMarking
  onValueChange={(date) => console.log(date)}
/>;
```

Use `defaultValue` for uncontrolled state or `value` and `onValueChange` for
controlled state. Values and limits use `YYYY-MM-DD`; `""` clears the value.
Invalid date props or reversed limits throw a `RangeError`. Month navigation does
not change the selected date. The selected day is highlighted; today has no
special visual marking by default.
Set `circularMarking={true}` (or simply `circularMarking`) to replace the selected
day's filled highlight and shadow with a hand-drawn pen circle. Omit it or set
`circularMarking={false}` to keep the default highlight. This only changes the
selection's appearance; keyboard focus, date selection, and disabled states
remain unchanged. The same prop is available on `WelkDateInput`.

Circles use one of six uneven pen shapes, chosen per date and component and kept
stable across renders. The default color is red (`#d62828`); pass
`circularMarkingColor="#2563eb"` (or any CSS color, including a CSS variable) to
override it. The color prop only applies when `circularMarking` is enabled.
Set `showTodaysDate={true}` (or simply `showTodaysDate`) to give today a yellow,
borderless boxed highlight. It defaults to `false` and works independently of
`circularMarking` on both date components. If today is also selected with circular
marking enabled, its pen circle appears over the yellow highlight. This option
does not change selection or keyboard behavior; today retains its accessible
`aria-current="date"` identification even without visual highlighting.
The top field accepts `YYYY-MM-DD` text and participates in form submission and
`required` validation. Invalid or partial entries stay editable, show an error,
and block form submission using custom validity without changing the selected
date or firing `onValueChange`. Valid out-of-range dates are reported through
`onValueChange`, remain visible, and also block submission. Out-of-range calendar
buttons are disabled.

Arrow keys move focus by day/week, Home/End by the current week; Enter or Space
selects the focused date. `disabled` disables all controls. Refs target the date
input; `className` targets the outer panel. Uncontrolled pickers reset with their
form. Date calculations avoid UTC/local timezone shifts; month/day labels are
currently English and weeks begin on Sunday.

### WelkTooltip

Animated comic tooltips: `variant="bubble"` (default) is a thinking bubble with
small trailing bubbles; `variant="speech"` is a speech bubble with a pointed tail.
`"speach"` is also accepted as an alias.

```tsx
import { WelkButton, WelkTooltip } from "@welkui/react";

<WelkTooltip content="A brilliant idea is brewing...">
  <WelkButton>Think</WelkButton>
</WelkTooltip>
<WelkTooltip variant="speech" content="Let's go!">
  <WelkButton>Speak</WelkButton>
</WelkTooltip>
```

Wrap one focusable element that forwards `aria-describedby` to its DOM node.
Hover or focus opens the tooltip above the trigger; Escape dismisses it without
moving focus. It stays visible while hovering the tooltip or focusing the trigger.
Existing descriptions, refs and trigger handlers are preserved. `content` is
plain descriptive text, not interactive content; do not rely on a tooltip as a
control's only label or for essential touch-only instructions. Disabled buttons
cannot receive keyboard focus. The comic pop-in respects reduced-motion settings.
`className` targets the bubble. Tooltips render inline, so allow room above them
and avoid clipping ancestors (`overflow: hidden`).

### WelkIconButton

A hand-drawn, distorted square button showing only an icon by default. The
`text` variant shows the label beside the icon.

```tsx
import { WelkIconButton } from "@welkui/react";

<WelkIconButton icon={<PlusIcon />} label="Add hero" onClick={handleAdd} />
<WelkIconButton variant="text" icon={<PlusIcon />} label="Add hero" onClick={handleAdd} />
```

`icon` and `label` are required. The label is the accessible name in icon-only
mode and visible text in `variant="text"`. Icons are decorative; do not nest
interactive controls inside them. Native button props, refs, keyboard activation,
focus styling and `disabled` are supported. `type` defaults to `"button"`.
This component uses a solid border only.

### WelkCard

Comic-styled clickable cards with a required `title` and `subtitle`, plus an
optional decorative `icon` at the top right.

```tsx
import { WelkCard } from "@welkui/react";

<WelkCard
  title="Your next adventure"
  subtitle="Start a new story."
  icon={<ArrowIcon />}
  onClick={handleOpen}
/>;
```

`growOnHover` defaults to `true`; set it to `false` to disable growth. Motion
respects reduced-motion preferences and only applies on hover-capable devices.
Cards render native buttons with Enter/Space activation, focus styling, `disabled`,
and button refs/attributes. The default `type="button"` avoids accidental form
submission. Keep title/subtitle content non-interactive; icons are decorative,
not separate buttons. `className` and `style` target the card.

### WelkImage

Comic-framed images with an irregular solid border, a slight hand-drawn tilt/skew,
and ink shadow. Both variants
render a native `<img>` and accept its attributes, events, styles and ref.

```tsx
import { WelkImage } from "@welkui/react";
import artwork from "./assets/artwork.jpg";

<WelkImage variant="asset" src={artwork} alt="Comic artwork" width={480} height={240} />
<WelkImage
  variant="network"
  src="https://your-domain.com/hero.jpg"
  alt="Our hero"
  fallbackSrc="/images/backup.jpg"
  width={480}
  height={240}
/>
```

`src` and `alt` are required; use `alt=""` for decorative images.
`variant="network"` is the default and switches to `fallbackSrc` on load failure.
An “Unable to load image” status label appears along the bottom border while the
fallback is displayed and clears when the source changes.
If omitted, the fallback is the bundled `assets/images/comic_bg_02.jpg`, chosen
from the comic backgrounds (not randomized at render time). Asset images accept
imported URLs or public paths and retain native error behavior without replacement.
`onError` is called for each failure, including a failed fallback; the fallback is
attempted only once, avoiding retry loops. Changing the source, responsive `srcSet`,
fallback or variant resets the attempt. Responsive sources are removed while showing
the fallback. Native `width`/`height` size the image; `style.objectFit` can override
the default `cover`. Images are capped to their container width.

### WelkQRCode

Generates a locally rendered SVG QR code for an absolute HTTP or HTTPS URL. The
QR generator is bundled with WelkUI, so consumers do not need to install it
separately. The code remains black on white for reliable scanning, inside a
comic-styled frame.

```tsx
import { WelkQRCode } from "@welkui/react";

<WelkQRCode url="https://your-domain.com" />;

<WelkQRCode
  url="https://your-domain.com"
  variant="card"
  title="Visit our website"
  subtitle="Scan to find out more."
  cardColor="#ffda57"
/>;

<WelkQRCode url="https://your-domain.com" originalCode />;
```

`url` must include `http://` or `https://`; invalid values show an accessible
error message instead of a QR code. The generated SVG has an accessible title
identifying its URL. The default variant retains the original compact frame.
Choose `variant="card"` to add an optional title and subtitle around the framed
code. `cardColor` accepts a CSS background color and defaults to the theme paper
color; the QR itself remains black on white for reliable scanning. Rounded
modules are used by default for a comic look; set `originalCode` to render
traditional square modules using the same encoded QR matrix.

### WelkRadio and WelkRadioGroup

Radios have a slightly distorted circular border; checkboxes use a slightly
distorted square. Both retain native input semantics, keyboard focus, disabled
states, form behavior and high-contrast indicators.

```tsx
import { WelkRadio, WelkRadioGroup } from "@welkui/react";

<WelkRadio label="Join the adventure" name="adventure" value="join" />

<WelkRadioGroup
  label="Choose your role"
  name="role"
  defaultValue="hero"
  options={[
    { label: "Hero", value: "hero" },
    { label: "Sidekick", value: "sidekick" },
    { label: "Villain", value: "villain", disabled: true },
  ]}
/>
```

`WelkRadio` accepts native radio props and an input ref, with a required `label`.
Give standalone radios the same `name` to create an exclusive selection.
`className` targets the input.

`WelkRadioGroup` renders a named fieldset/legend and radio options. Each option
needs a unique string `value` and `label`, with optional `disabled`. Use
`defaultValue` for uncontrolled selection, or `value` and `onValueChange` for a
controlled group. `disabled` disables all options; `required` enables native
validation. `name` sets the submitted form field name; if omitted, a unique
group name is generated. Arrow keys move between enabled choices. Group refs
and `className` target the fieldset. Checkbox indeterminate state remains
available through the input ref's native `indeterminate` property.

### WelkDialog

An accessible native modal with comic-themed `alert` (default), `info`,
`warning`, `error`, and `success` variants. Native `showModal()` provides modal
focus containment and Escape dismissal. Every dialog has a close icon.

```tsx
const [open, setOpen] = useState(false);

<WelkDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Continue your adventure?"
  variant="info"
  type="confirmation"
  closeOnTapOutside
>
  Choose whether to continue.
</WelkDialog>;
```

Import `WelkDialog` from `@welkui/react`. Keep `open` state in a Client Component
and set it to `false` in `onClose`; reopening uses `setOpen(true)`.

- `type="default"` renders one button with `buttonText="Okay"` and optional `onPress`.
- `type="confirmation"` renders green `yesText="Yes"` and red `noText="No"`
  buttons, with optional `onYesPress` and `onNoPress` handlers.
- Omitting a button handler closes the dialog. A custom handler **replaces**
  that behavior; set your open state to `false` in it if you also want to close.
- `closeOnTapOutside` defaults to `false`; when enabled, tapping the backdrop
  closes the modal. Clicking content or dragging from inside to outside does not.
- `closeLabel` customizes the close icon's accessible label (default: "Close dialog").

Native Escape, close-icon, and default-action dismissal call `onClose`.
The `title` names the modal; `children` provides its content. Images, forms,
and other complex content can be used without being flattened into a description.

### WelkAvatar

Comic-themed circular avatars support four bundled profile images, a custom image,
or a custom icon. `user` is the default and aliases `male-user`.

```tsx
import { WelkAvatar } from "@welkui/react";

<WelkAvatar variant="male-user" alt="Male user" />
<WelkAvatar variant="female-user" alt="Female user" />
<WelkAvatar variant="male-admin" alt="Male admin" />
<WelkAvatar variant="female-admin" alt="Female admin" />
<WelkAvatar src="/photos/hero.jpg" alt="Captain Welk" size="lg" />
<WelkAvatar icon={<StarIcon />} alt="Favorite profile" />
<WelkAvatar variant="female-user" alt="Profile" color="#82caff" />
```

The required `alt` provides the avatar's accessible name. `src` takes priority
over `icon`, which takes priority over the variant portrait. Sizes are `sm`
(32px), `md` (48px, default), and `lg` (64px). Native span attributes and refs are
forwarded; `className` targets the outer frame. Icons should be non-interactive.
The avatar itself is not a button. Custom image failures use normal browser
image behavior; no automatic fallback is applied.

Set `growOnHover={true}` to scale the avatar up by 10% on hover without moving
surrounding content. It defaults to `false` and respects reduced-motion preferences.

Use `color` to set the avatar background to any CSS color (including CSS
variables). It defaults to the theme's paper color when omitted. An explicit
`style.backgroundColor` overrides `color`. Opaque custom images may cover the background.

### WelkInput

Add an optional clickable custom icon inside the end of `WelkInput` with
`endAction`. Pass an icon (not a nested button/link), an accessible action label,
and a click handler:

```tsx
<WelkInput
  label="Search"
  endAction={{
    icon: <SearchIcon />,
    label: "Run search",
    onClick: () => runSearch(),
  }}
/>
```

The action is a keyboard-accessible `type="button"` and never implicitly submits
the form. It follows the input's `disabled` state, or can be independently
disabled with `endAction.disabled`. It stays usable on read-only inputs.

`WelkInput` is a comic-themed text field with a required `label`, native input
props/ref, and `type="text"` by default. It also supports `email`, `password`,
`search`, `tel`, and `url`. Use `value`/`onChange` for controlled inputs or
`defaultValue` for uncontrolled inputs. Native `required`, `disabled`, `readOnly`,
`name`, and autocomplete attributes are forwarded; `className` targets the input.
Connect helper/error text with `aria-describedby` and mark invalid fields with
`aria-invalid="true"`. Labels receive a generated ID association unless you supply `id`.

| Component       | API                                                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WelkButton`    | Native button props/ref; `variant="primary" \| "error" \| "warning" \| "ghost" \| "info" \| "success"` and `size="sm" \| "md" \| "lg"`. Defaults to `variant="primary"` and `type="button"`.   |
| `WelkCheckBox`  | Native checkbox props/ref with a required `label`; supports `checked`/`onChange` or `defaultChecked`, form names, disabled state, and generated accessible IDs. `className` targets the input. |
| `WelkAccordion` | Native `details` props/ref with a required `title` rendered as the summary. Supports native keyboard disclosure, `open`, and `onToggle`. `className` targets the details element.              |

The accordion is a single native disclosure, not a managed multi-item accordion.
Its `variant` can be `vertical` (default), `horizontal` (content beside the title),
or `nested` (a compact, inset-style disclosure for placement inside another accordion).
Compose nested accordions as children:

```tsx
<WelkAccordion title="Parent" closeOnOutsideClick>
  <WelkAccordion title="Child" variant="nested" closeOnOutsideClick>
    Child content
  </WelkAccordion>
</WelkAccordion>
```

`closeOnOutsideClick` defaults to `false`. When enabled, mouse/touch/pen presses
outside that accordion close it and trigger the native `onToggle` event.
Child interactions count as inside the parent; tapping elsewhere in the parent
can close a child without closing the parent. Each instance opts in independently.
If application state tracks `open`, synchronize it in `onToggle` using
`event.currentTarget.open`. Horizontal layout uses the native `::details-content`
pseudo-element in modern browsers.

Set `fixedWidth={320}` (pixels) or `fixedWidth="24rem"` to keep the same outer
width while closed or open. Title and content text wrap within that width.
The width is capped at the parent width on smaller screens. When supplied,
`fixedWidth` takes precedence over `style.width`; omitting it preserves normal
layout sizing. This works with all three variants.

Opening and closing use a 240ms expand-and-fade transition, with a sideways
expansion for horizontal panels. Reduced-motion preferences disable these
transitions. Browsers without intrinsic-size interpolation retain instant
native disclosure behavior.

Use non-interactive content for its summary title. Its `open` and `onToggle`
follow native details/React semantics; there is no separate `defaultOpen` prop.

Button variants: primary uses the theme accent, error is red, warning is orange,
ghost has a transparent background with an outline, info is blue, and success is
green. The original paper-colored `secondary` variant remains supported for
backward compatibility. Semantic colors and their hover states can be customized
with `--welk-color-error`, `--welk-color-error-hover`, and the corresponding
`warning`, `info`, and `success` tokens.
