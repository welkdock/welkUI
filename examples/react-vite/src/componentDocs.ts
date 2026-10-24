import type { ComponentName } from "./catalogue";

type Prop = readonly [
  name: string,
  type: string,
  defaultValue: string,
  description: string,
];

interface ComponentDocumentation {
  description: string;
  variants: readonly string[];
  props: readonly Prop[];
  native?: string;
}

const label: Prop = [
  "label",
  "ReactNode",
  "Required",
  "Visible, accessible control label.",
];
const className: Prop = [
  "className",
  "string",
  "Unset",
  "Additional CSS class on the component root.",
];
const sizes: Prop = [
  "size",
  '"sm" | "md" | "lg"',
  '"md"',
  "Small, medium, or large presentation.",
];
const formProps: readonly Prop[] = [
  ["name", "string", "Unset", "Name used when submitting a native form."],
  [
    "id",
    "string",
    "Generated",
    "Control identifier; automatically linked to its label.",
  ],
  ["disabled", "boolean", "false", "Prevents interaction."],
  ["required", "boolean", "false", "Enables native required-field validation."],
  className,
];
const stringValueProps: readonly Prop[] = [
  [
    "value",
    "string",
    "Uncontrolled",
    "Controlled selection. Update it in onValueChange.",
  ],
  ["defaultValue", "string", '""', "Initial value for uncontrolled use."],
  [
    "onValueChange",
    "(value: string) => void",
    "Unset",
    "Called with the updated value; an empty string clears it.",
  ],
];
const dateProps: readonly Prop[] = [
  label,
  ...stringValueProps,
  ["min", "string", "Unset", "Earliest allowed date, in YYYY-MM-DD format."],
  ["max", "string", "Unset", "Latest allowed date, in YYYY-MM-DD format."],
  ...formProps,
];
const cardProps: readonly Prop[] = [
  ["title", "ReactNode", "Required", "Main card heading."],
  ["subtitle", "ReactNode", "Required", "Supporting card content."],
  ["icon", "ReactNode", "Unset", "Optional leading artwork or icon."],
  [
    "growOnHover",
    "boolean",
    "true",
    "Enables the joined hover growth effect; disabled cards do not grow.",
  ],
];
const modalProps: readonly Prop[] = [
  [
    "open",
    "boolean",
    "Required",
    "Controlled visibility. Set false when dismissal is requested.",
  ],
  [
    "onClose",
    "() => void",
    "Required",
    "Dismissal callback; the parent must update open.",
  ],
  [
    "title",
    "ReactNode",
    "Required",
    "Visible title and accessible dialog name.",
  ],
  ["children", "ReactNode", "Unset", "Panel content."],
  [
    "closeOnTapOutside",
    "boolean",
    "false",
    "Allows dismissal by pressing and releasing on the backdrop.",
  ],
  className,
];
const imageProps: readonly Prop[] = [
  ["src", "string", "Required", "Image URL or imported local asset."],
  [
    "alt",
    "string",
    "Required",
    'Accessible image description; use "" for purely decorative artwork.',
  ],
  [
    "fallbackSrc",
    "string",
    "Unset",
    "Alternative image if loading the original fails.",
  ],
];
const checkedProps: readonly Prop[] = [
  label,
  [
    "checked",
    "boolean",
    "Uncontrolled",
    "Controlled checked state; update it through the change callback.",
  ],
  [
    "defaultChecked",
    "boolean",
    "false",
    "Initial checked state for uncontrolled use.",
  ],
  [
    "onChange",
    "ChangeEventHandler<HTMLInputElement>",
    "Unset",
    "Native change event; read event.currentTarget.checked.",
  ],
];
const buttonNative =
  "Inherits native button props, including children (except where replaced by named content props), onClick, disabled, type, name, value, className, style, aria-* and data-*; forwards a button ref. The default type is button, not submit.";
const inputNative =
  "Inherits native input props except the fields replaced by this component's API: name, id, disabled, required, form, onBlur, onFocus, className, style, aria-* and data-* are supported. Forwards an input ref.";
const colorVariants = [
  "default: neutral paper surface.",
  "info: informational blue.",
  "success: positive green.",
  "warning: caution yellow.",
  "error: error red.",
];

export const componentDocs = {
  WelkAccordion: {
    description:
      "A native details/summary disclosure for progressively revealing content. Click or use the keyboard on its title to toggle it. Set the native open prop to start expanded; nest accordions inside the content to build hierarchies.",
    variants: [
      "vertical: expands below the summary (default).",
      "horizontal: reveals content sideways.",
      "nested: compact styling for disclosures inside another accordion.",
    ],
    props: [
      ["title", "ReactNode", "Required", "Interactive disclosure heading."],
      ["children", "ReactNode", "Unset", "Content revealed when expanded."],
      [
        "variant",
        '"vertical" | "horizontal" | "nested"',
        '"vertical"',
        "Disclosure layout and appearance.",
      ],
      [
        "closeOnOutsideClick",
        "boolean",
        "false",
        "Closes the disclosure when clicking outside it.",
      ],
      [
        "fixedWidth",
        'CSSProperties["width"]',
        "Unset",
        "Fixed disclosure width, such as 320 or 20rem.",
      ],
      [
        "open",
        "boolean",
        "Native default: false",
        "Native details open state.",
      ],
      [
        "onToggle",
        "ReactEventHandler<HTMLDetailsElement>",
        "Unset",
        "Native disclosure toggle notification.",
      ],
    ],
    native:
      "Inherits native details props except title, including name, className, style, aria-* and data-*; forwards a details ref.",
  },
  WelkAttachment: {
    description:
      "A native file picker with a selected-file list and small local image, video, and audio previews. Documents remain filename/size entries. Each selection replaces the previous batch. Invalid count, size, or type rejects the entire batch, clears the selection, and displays an error. Files are not uploaded automatically; object URLs are released when previews are removed.",
    variants: [
      "multiple=true: select a batch (default).",
      "multiple=false: select one file.",
      "Preview type is inferred from the file MIME type; unsupported media displays a preview error.",
    ],
    props: [
      label,
      [
        "maxFiles",
        "number",
        "Unlimited",
        "Positive whole-number limit on the number of selected files.",
      ],
      [
        "maxFileSize",
        "number",
        "Unlimited",
        "Positive maximum size per file in bytes; 5242880 equals 5 MiB.",
      ],
      [
        "onFilesChange",
        "(files: File[]) => void",
        "Unset",
        "Receives accepted files, or [] after clearing/rejection.",
      ],
      ["multiple", "boolean", "true", "Allows multiple file selection."],
      [
        "accept",
        "string",
        "Any file type",
        "Comma-separated extensions or MIME types, such as image/*,.pdf.",
      ],
      [
        "onChange",
        "ChangeEventHandler<HTMLInputElement>",
        "Unset",
        "Native picker change event.",
      ],
    ],
    native: `${inputNative} type is fixed to file; value, defaultValue and children are not supported. Form reset clears files and previews without calling onFilesChange.`,
  },
  WelkAvatar: {
    description:
      "A compact portrait with a comic outline. Supply a custom src or icon, or choose a bundled portrait. The alt text supplies its accessible name. Custom image loading uses native browser behavior without an automatic fallback.",
    variants: [
      "user: default portrait.",
      "male-user / female-user: user portraits.",
      "male-admin / female-admin: administrator portraits.",
      "All portraits support sm, md and lg sizes.",
    ],
    props: [
      ["alt", "string", "Required", "Accessible description of the avatar."],
      [
        "src",
        "string",
        "Unset",
        "Custom image URL; takes precedence over icon and bundled artwork.",
      ],
      [
        "icon",
        "ReactNode",
        "Unset",
        "Custom content instead of the bundled portrait.",
      ],
      [
        "variant",
        '"user" | "male-user" | "female-user" | "male-admin" | "female-admin"',
        '"user"',
        "Bundled portrait selection.",
      ],
      sizes,
      [
        "color",
        'CSSProperties["backgroundColor"]',
        "Theme color",
        "Custom avatar background color.",
      ],
      ["growOnHover", "boolean", "false", "Enables hover enlargement."],
    ],
    native:
      "Inherits native span attributes except children and color; forwards a span ref.",
  },
  WelkBadge: {
    description:
      "A non-interactive inline label for statuses, categories, and counts. It does not announce changes automatically and has no button behavior; add appropriate semantics in the consuming application when needed.",
    variants: [...colorVariants, "Sizes: sm, md (default), lg."],
    props: [
      ["children", "ReactNode", "Unset", "Badge label or count."],
      [
        "variant",
        '"default" | "info" | "success" | "warning" | "error"',
        '"default"',
        "Semantic color treatment.",
      ],
      sizes,
    ],
    native:
      "Inherits native span attributes, including className, style, aria-* and data-*; forwards a span ref.",
  },
  WelkBreadCrumbs: {
    description:
      "A labeled navigation trail rendered as an ordered list. Items with href become native links without underlines; items without href are text. The final item receives aria-current=page. Trails wrap on narrow screens.",
    variants: [
      "One navigation presentation; customize the separator with text or a decorative React node.",
    ],
    props: [
      [
        "items",
        "readonly WelkBreadCrumbItem[]",
        "Required",
        "Ordered items: { label: ReactNode, href?: string, ...anchorProps }. The component manages children and aria-current.",
      ],
      [
        "separator",
        "ReactNode",
        '"/"',
        "Decorative separator between items; hidden from assistive technology.",
      ],
      ["aria-label", "string", '"Breadcrumb"', "Accessible navigation name."],
    ],
    native:
      "Inherits native nav props except children; forwards a nav ref. Each item supports native anchor props except children and aria-current.",
  },
  WelkButton: {
    description:
      "A native action button with uneven comic borders, a hard shadow, and hover/press feedback. Use a semantic color for the action's intent and a size matching its context. Set type=submit explicitly for form submission.",
    variants: [
      "primary: highlighted main action (default).",
      "secondary: supporting action.",
      "ghost: subtle action.",
      "info / success / warning / error: semantic action colors.",
      "Sizes: sm, md (default), lg.",
    ],
    props: [
      [
        "children",
        "ReactNode",
        "Unset",
        "Button label and optional inline content.",
      ],
      [
        "variant",
        '"primary" | "secondary" | "ghost" | "info" | "success" | "warning" | "error"',
        '"primary"',
        "Action color and surface treatment.",
      ],
      sizes,
      [
        "onClick",
        "MouseEventHandler<HTMLButtonElement>",
        "Unset",
        "Action callback.",
      ],
      [
        "disabled",
        "boolean",
        "false",
        "Disables interaction and active styling.",
      ],
    ],
    native: buttonNative,
  },
  WelkCard: {
    description:
      "A single clickable card implemented as a native button, with a title, subtitle, and optional icon. The entire card is the action target. Do not place links, buttons, or other interactive controls inside it.",
    variants: [
      "One comic card presentation; growOnHover optionally disables enlargement.",
    ],
    props: cardProps,
    native: buttonNative,
  },
  WelkCheckBox: {
    description:
      "A labeled native checkbox for independent on/off choices. Use defaultChecked for local state or checked plus onChange for controlled state. Native form submission and reset behavior are retained.",
    variants: [
      "Unchecked, checked, disabled, and native indeterminate states; there is no variant prop.",
    ],
    props: checkedProps,
    native: `${inputNative} type is fixed to checkbox; size and children are omitted. Native value and defaultValue remain available.`,
  },
  WelkDateInput: {
    description:
      "A compact editable date field that opens the library's custom calendar rather than a browser date popup. It shares the DatePicker API and keyboard/date-selection behavior. Date values and bounds use YYYY-MM-DD; an empty string clears the value.",
    variants: [
      "Compact popup calendar presentation. Use WelkDatePicker for a full visible calendar.",
    ],
    props: dateProps,
  },
  WelkDatePicker: {
    description:
      "A full-month custom calendar with month navigation and an editable date field. Select a day or type a date; min and max constrain available dates. Use controlled value/onValueChange or uncontrolled defaultValue. Date strings use YYYY-MM-DD.",
    variants: [
      "Full calendar presentation. Use WelkDateInput for the compact popup version.",
    ],
    props: dateProps,
  },
  WelkDialog: {
    description:
      "A controlled native modal dialog with a comic surface and focus containment. The parent owns open and must close it in onClose. Escape requests dismissal; optional backdrop dismissal is off by default. Action callbacks let the application perform work before updating visibility.",
    variants: [
      "alert (default), info, warning, error, success: semantic surfaces.",
      "type=default: one action button.",
      "type=confirmation: separate Yes and No buttons.",
    ],
    props: [
      ...modalProps,
      [
        "variant",
        '"alert" | "info" | "warning" | "error" | "success"',
        '"alert"',
        "Dialog color treatment.",
      ],
      [
        "type",
        '"default" | "confirmation"',
        '"default"',
        "Single-action or two-action footer.",
      ],
      [
        "closeLabel",
        "string",
        '"Close dialog"',
        "Accessible name for the close button.",
      ],
      ["buttonText", "string", '"Okay"', "Default-mode action label."],
      [
        "onPress",
        "MouseEventHandler<HTMLButtonElement>",
        "Closes dialog",
        "Default-mode action callback. When supplied, it replaces automatic action-button dismissal.",
      ],
      ["yesText", "string", '"Yes"', "Confirmation positive-action label."],
      ["noText", "string", '"No"', "Confirmation negative-action label."],
      [
        "onYesPress",
        "MouseEventHandler<HTMLButtonElement>",
        "Closes dialog",
        "Confirmation positive-action callback. When supplied, manage dismissal yourself.",
      ],
      [
        "onNoPress",
        "MouseEventHandler<HTMLButtonElement>",
        "Closes dialog",
        "Confirmation negative-action callback. When supplied, manage dismissal yourself.",
      ],
    ],
  },
  WelkDivider: {
    description:
      "A semantic separator with a slightly irregular comic line. Horizontal dividers span their container; give vertical dividers an appropriate height through style or the surrounding layout.",
    variants: [
      "plain: solid line (default).",
      "dotted: dotted separator.",
      "dashed: dashed separator.",
      "Orientations: horizontal (default), vertical.",
    ],
    props: [
      [
        "orientation",
        '"horizontal" | "vertical"',
        '"horizontal"',
        "Separator direction and aria-orientation.",
      ],
      ["variant", '"plain" | "dotted" | "dashed"', '"plain"', "Line pattern."],
      ["thickness", "number", "2", "Finite positive line thickness in pixels."],
    ],
    native:
      "Inherits native div attributes except children; forwards a div ref.",
  },
  WelkDrawer: {
    description:
      "A controlled native modal panel that slides in from an edge with comic motion. It contains focus, locks body scrolling, and restores focus after closing. onClose requests a parent state update; closing keeps the panel mounted briefly for its exit animation.",
    variants: [
      "right: right-edge panel (default).",
      "left: left-edge panel.",
      "top: top-edge panel.",
      "bottom: bottom-edge panel.",
    ],
    props: [
      ...modalProps,
      [
        "position",
        '"left" | "right" | "top" | "bottom"',
        '"right"',
        "Entry edge and panel placement.",
      ],
      [
        "closeLabel",
        "string",
        '"Close drawer"',
        "Accessible name for the close button.",
      ],
    ],
  },
  WelkDropDown: {
    description:
      "A labeled single-selection control. The default uses a styled native select; searchable uses an editable combobox and filtered list while retaining a native select for forms. Typing filters labels but does not commit a value. Use arrow keys and Enter to select; Escape dismisses the list.",
    variants: [
      "searchable=false: native select (default).",
      "searchable=true: label-filtering combobox.",
    ],
    props: [
      label,
      [
        "options",
        "readonly WelkDropDownOption[]",
        "Required",
        "Options: { value: string, label: string, disabled?: boolean }.",
      ],
      ...stringValueProps,
      [
        "searchable",
        "boolean",
        "false",
        "Enables built-in case-insensitive filtering.",
      ],
      [
        "placeholder",
        "string",
        '"Select an option"',
        "Text shown when no option is selected.",
      ],
      ...formProps,
    ],
    native:
      "Forwards a native select ref. Only the listed props are supported, rather than arbitrary select attributes.",
  },
  WelkIconButton: {
    description:
      "A compact native button for an icon action. Always provide a descriptive label. The default exposes it as an accessible name; the text variant also displays the label beside the icon.",
    variants: [
      "default: icon only, accessible label (default).",
      "text: icon with visible text.",
    ],
    props: [
      [
        "icon",
        "ReactNode",
        "Required",
        "Icon content; its wrapper is hidden from assistive technology.",
      ],
      [
        "label",
        "string",
        "Required",
        "Accessible action name, also visible in text mode.",
      ],
      [
        "variant",
        '"default" | "text"',
        '"default"',
        "Whether to display the text label.",
      ],
    ],
    native: buttonNative,
  },
  WelkImage: {
    description:
      "A native image inside an uneven comic frame. Network mode replaces a failed image with a fallback and displays an Unable to load image status label. Asset mode leaves image errors to native behavior. Supply dimensions to reserve layout space.",
    variants: [
      "network: fallback-aware image (default).",
      "asset: native loading/error behavior for bundled artwork.",
    ],
    props: [
      ...imageProps.slice(0, 2),
      [
        "fallbackSrc",
        "string",
        "Bundled comic artwork",
        "Replacement image after a network-mode load failure.",
      ],
      [
        "variant",
        '"network" | "asset"',
        '"network"',
        "Image error-handling mode; fallbackSrc is used in network mode.",
      ],
    ],
    native:
      "Inherits native image props except src, alt and children, including width, height, loading, decoding, onLoad, onError, className and style; forwards an image ref.",
  },
  WelkInput: {
    description:
      "A labeled native text-like input with comic framing. Supports common text types and an optional end-action button, such as showing a password or clearing a search. Keep controlled value and onChange in sync.",
    variants: [
      "Types: text (default), email, password, search, tel, url.",
      "Optional endAction adds an independently labeled icon button.",
    ],
    props: [
      label,
      [
        "type",
        '"text" | "email" | "password" | "search" | "tel" | "url"',
        '"text"',
        "Native text-input behavior.",
      ],
      [
        "endAction",
        "{ icon: ReactNode; label: string; onClick: MouseEventHandler<HTMLButtonElement>; disabled?: boolean }",
        "Unset",
        "Optional trailing action; label names the icon button.",
      ],
      [
        "value / defaultValue",
        "Native input value",
        "Native defaults",
        "Controlled or initial input content.",
      ],
      [
        "onChange",
        "ChangeEventHandler<HTMLInputElement>",
        "Unset",
        "Native text change event.",
      ],
    ],
    native: `${inputNative} children is omitted and type is restricted to the listed text-like types.`,
  },
  WelkMenu: {
    description:
      "A vertical navigation list with comic text, line separators, and forward arrows. Nested mode uses native disclosures with downward arrows and preserves each parent's destination through a Go to link. Escape closes the closest branch, then the whole collapsible menu. Links retain native navigation behavior.",
    variants: [
      "default: flat route list (default).",
      "nested: expandable recursive children.",
      "collapsible=true: adds an animated whole-menu toggle; starts expanded.",
    ],
    props: [
      [
        "items",
        "readonly WelkMenuItem[]",
        "Required",
        "Recursive entries: { title: string, route: string, children?: readonly WelkMenuItem[] }.",
      ],
      [
        "variant",
        '"default" | "nested"',
        '"default"',
        "Enables nested branch disclosures.",
      ],
      [
        "activeRoute",
        "string",
        "Unset",
        "Exact route to mark with aria-current=page.",
      ],
      [
        "collapsible",
        "boolean",
        "false",
        "Adds menu/close icon toggle; hidden content becomes inert.",
      ],
      [
        "aria-label",
        "string",
        '"Main navigation"',
        "Accessible name for the navigation region.",
      ],
    ],
    native: "Inherits native nav props except children; forwards a nav ref.",
  },
  WelkOTPInput: {
    description:
      "One native numeric-text input visually split into digit slots, preserving paste, autofill, keyboard editing, forms, and reset behavior. User-entered non-digits are removed and input is limited to length. Supplied value/defaultValue must contain only digits and fit the configured length, otherwise a RangeError is thrown. onComplete fires when an edit fills all slots; it does not submit or verify the code.",
    variants: [
      "Six slots by default; length configures the slot count. No color variant prop.",
    ],
    props: [
      label,
      ["length", "number", "6", "Positive whole-number digit count."],
      ...stringValueProps,
      [
        "onComplete",
        "(value: string) => void",
        "Unset",
        "Called when a user edit produces a complete code.",
      ],
      ["autoComplete", "string", '"one-time-code"', "Native autofill hint."],
    ],
    native: `${inputNative} type, children, onChange, size, maxLength, minLength, pattern and inputMode are managed internally; use onValueChange.`,
  },
  WelkQRCode: {
    description:
      "Generates a locally rendered SVG QR code for an absolute HTTP or HTTPS URL. The QR generator is bundled with WelkUI, so consumers do not need to install it separately. Invalid URLs show an accessible error instead.",
    variants: [
      "Valid absolute HTTP(S) URLs render a high-contrast, accessible SVG.",
      "Invalid or unsupported URL schemes render an error message.",
      "card: adds an optional heading, subtitle and customizable card background.",
      "Comic rounded modules by default; originalCode restores square modules.",
    ],
    props: [
      ["url", "string", "Required", "Absolute HTTP or HTTPS URL to encode."],
      [
        "variant",
        '"default" | "card"',
        '"default"',
        "Use the original QR frame or present it inside a themed card.",
      ],
      ["title", "string", "Unset", "Optional heading in the card variant."],
      [
        "subtitle",
        "string",
        "Unset",
        "Optional supporting text in the card variant.",
      ],
      [
        "cardColor",
        'CSSProperties["backgroundColor"]',
        "Theme paper",
        "Optional CSS background color for the card variant.",
      ],
      [
        "originalCode",
        "boolean",
        "false",
        "Use traditional square QR modules instead of comic rounded modules. Finder and timing patterns remain square in both modes.",
      ],
    ],
  },
  WelkRadio: {
    description:
      "A labeled native radio for one mutually exclusive option. Give related radios the same name and different values. Control checked/onChange individually or use WelkRadioGroup for a labeled options collection.",
    variants: [
      "Unchecked, checked and disabled native states; there is no variant prop.",
    ],
    props: [
      ...checkedProps,
      [
        "name",
        "string",
        "Unset",
        "Shared group name; required for native mutual exclusion.",
      ],
      [
        "value",
        "Native input value",
        "Native default",
        "Submitted value for this option.",
      ],
    ],
    native: `${inputNative} type is fixed to radio; size and children are omitted.`,
  },
  WelkRadioGroup: {
    description:
      "A native fieldset and legend containing labeled radio options. It manages one selected string value and can disable the entire group or individual options. Use value/onValueChange for controlled selection or defaultValue for local form state.",
    variants: [
      "One grouped radio presentation with optional per-option disabled states.",
    ],
    props: [
      label,
      [
        "options",
        "readonly WelkRadioOption[]",
        "Required",
        "Options: { label: ReactNode, value: string, disabled?: boolean }.",
      ],
      ["value", "string", "Uncontrolled", "Controlled selected option value."],
      ["defaultValue", "string", "Unset", "Initially selected option value."],
      [
        "onValueChange",
        "(value: string) => void",
        "Unset",
        "Called when an option is selected.",
      ],
      [
        "required",
        "boolean",
        "false",
        "Requires a selection in the native form.",
      ],
      [
        "name",
        "string",
        "Generated",
        "Shared native form field name for all options.",
      ],
    ],
    native:
      "Inherits native fieldset props except children, onChange and defaultValue, including disabled, form, className, style and aria-*; forwards a fieldset ref.",
  },
  WelkRangeSlider: {
    description:
      "A labeled native range input with a slightly distorted straight track. Values and onValueChange use numbers. It preserves native keyboard stepping, form submission, reset, and disabled behavior.",
    variants: ["One range presentation; customize numeric bounds and step."],
    props: [
      label,
      ["value", "number", "Uncontrolled", "Controlled numeric value."],
      [
        "defaultValue",
        "number",
        "Native midpoint",
        "Initial uncontrolled value.",
      ],
      [
        "onValueChange",
        "(value: number) => void",
        "Unset",
        "Receives the numeric value after a change.",
      ],
      ["min", "Native input min", "0", "Lower range bound."],
      ["max", "Native input max", "100", "Upper range bound."],
      [
        "step",
        "Native input step",
        "1",
        "Allowed increments, or any for continuous values.",
      ],
      [
        "onChange",
        "ChangeEventHandler<HTMLInputElement>",
        "Unset",
        "Optional native change event in addition to onValueChange.",
      ],
    ],
    native: `${inputNative} type is fixed to range and children is omitted; value/defaultValue must be numeric.`,
  },
  WelkSnackBar: {
    description:
      "A controlled, portaled notification with comic pop-in and exit animations and a polite status announcement. Update open in onClose. A positive autoHideDuration requests dismissal after that many milliseconds; hover or focus pauses it and leaving restarts the full duration. Motion respects reduced-motion preferences.",
    variants: [
      ...colorVariants,
      "Positions: top-left, top-middle, top-right, bottom-left, bottom-middle (default), bottom-right.",
    ],
    props: [
      ["open", "boolean", "Required", "Controlled notification visibility."],
      [
        "onClose",
        "() => void",
        "Required",
        "Dismissal request from the close button or timer; update open.",
      ],
      ["message", "ReactNode", "Required", "Notification content."],
      [
        "position",
        '"top-left" | "top-middle" | "top-right" | "bottom-left" | "bottom-middle" | "bottom-right"',
        '"bottom-middle"',
        "Viewport anchor.",
      ],
      [
        "variant",
        '"default" | "info" | "success" | "warning" | "error"',
        '"default"',
        "Notification color treatment.",
      ],
      [
        "autoHideDuration",
        "number",
        "0",
        "Non-negative finite duration in milliseconds; 0 disables automatic dismissal.",
      ],
      [
        "closeLabel",
        "string",
        '"Dismiss notification"',
        "Accessible name for the close button.",
      ],
      className,
    ],
  },
  WelkSticker: {
    description:
      "An image with an SVG outline following its alpha silhouette and a sticking animation after load. Transparent artwork produces a cutout; opaque backgrounds are outlined as part of the image. Optional hover elevation adds depth, and load failures can use fallbackSrc.",
    variants: [
      "One sticker presentation; configurable outline color/thickness and hover elevation.",
    ],
    props: [
      ...imageProps,
      [
        "outlineThickness",
        "number",
        "6",
        "Finite non-negative outline width in pixels.",
      ],
      [
        "outlineColor",
        'CSSProperties["color"]',
        '"white"',
        "Silhouette outline color.",
      ],
      ["elevateOnHover", "boolean", "false", "Enables lifted hover styling."],
    ],
    native:
      "Inherits native image props except src, alt and children, including width, height, loading, onLoad, onError, className and style; forwards an image ref.",
  },
  WelkStickerCard: {
    description:
      "A content-height clickable card with oversized decorative artwork overlapping its left edge. Card and sticker share one hover growth effect. Artwork sizing is managed by the component; the card remains a native button, so avoid interactive descendants.",
    variants: [
      "One joined card/sticker presentation; growOnHover controls their shared enlargement.",
    ],
    props: [
      ...cardProps,
      [
        "sticker",
        'Omit<WelkStickerProps, "className" | "style" | "width" | "height">',
        "Required",
        'Sticker options: src and alt, with optional fallbackSrc, outlineThickness, outlineColor, elevateOnHover and other image attributes. Artwork is forced decorative (alt=""); independent elevation is disabled so both pieces move together.',
      ],
    ],
    native: buttonNative,
  },
  WelkSwitch: {
    description:
      "A native checkbox exposed as a switch with a regular pill track, circular thumb, comic colors, and animated sliding. Use checked/onCheckedChange for controlled state or defaultChecked for native local state. The visible label is also clickable.",
    variants: [
      "Off, on and disabled states. The geometry is not distorted; there is no variant prop.",
    ],
    props: [
      ...checkedProps,
      [
        "onCheckedChange",
        "(checked: boolean) => void",
        "Unset",
        "Boolean state callback in addition to native onChange.",
      ],
    ],
    native: `${inputNative} type and role are fixed to checkbox and switch; size and children are omitted.`,
  },
  WelkTabs: {
    description:
      "A styled, accessible tab list detached from its content panels by a small gap. It supports controlled or uncontrolled selection, disabled tabs, horizontal or vertical layout, and keyboard navigation.",
    variants: [
      "Default detached tabs or withBg toggle-style tabs on a shared background.",
      "Both variants support horizontal (default) or vertical orientation and automatic activation.",
    ],
    props: [
      label,
      [
        "items",
        "readonly WelkTabItem[]",
        "Required",
        "Items: { label: ReactNode, value: string, content: ReactNode, disabled?: boolean }.",
      ],
      ["value", "string", "Uncontrolled", "Controlled selected tab value."],
      [
        "defaultValue",
        "string",
        "First enabled tab",
        "Initially selected tab.",
      ],
      [
        "onValueChange",
        "(value: string) => void",
        "Unset",
        "Called when a tab is selected.",
      ],
      [
        "variant",
        '"default" | "withBg"',
        '"default"',
        "Detached buttons or toggle-style buttons on a shared background.",
      ],
      [
        "orientation",
        '"horizontal" | "vertical"',
        '"horizontal"',
        "Sets the tab layout and corresponding arrow-key direction.",
      ],
      className,
    ],
    native:
      "Inherits div props except children, defaultValue and onChange; forwards a div ref. The required label names the tab list.",
  },
  WelkTimePicker: {
    description:
      "An editable 24-hour time field with custom scrollable wheels showing three rows per column. Type a time or select hours/minutes using the wheels and keyboard. Use controlled value/onValueChange or uncontrolled defaultValue; an empty string clears the time.",
    variants: [
      "showSeconds=false: HH:mm (default).",
      "showSeconds=true: HH:mm:ss with an additional seconds wheel.",
    ],
    props: [
      label,
      ...stringValueProps,
      [
        "showSeconds",
        "boolean",
        "false",
        "Enables seconds in both the input format and wheels.",
      ],
      ...formProps,
    ],
  },
  WelkTooltip: {
    description:
      "A short contextual hint shown on hover or keyboard focus and dismissed with Escape. Wrap exactly one focusable React element that accepts aria-describedby. Do not put essential information or interactive controls only inside a tooltip.",
    variants: [
      "bubble: thinking-bubble silhouette (default).",
      "speech: speech-bubble tail.",
      "speach: compatibility alias for speech.",
    ],
    props: [
      ["content", "string", "Required", "Plain-text hint."],
      [
        "children",
        'ReactElement<{ "aria-describedby"?: string }>',
        "Required",
        "One focusable child; receives the tooltip description reference.",
      ],
      [
        "variant",
        '"bubble" | "speech" | "speach"',
        '"bubble"',
        "Bubble silhouette.",
      ],
      className,
    ],
  },
} satisfies Record<ComponentName, ComponentDocumentation>;

export function getComponentDocs(name: ComponentName): ComponentDocumentation {
  return componentDocs[name];
}
