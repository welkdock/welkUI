import type { ComponentName } from "./catalogue";

export const componentGuides = {
  WelkAccordion: [
    "Use disclosures for optional detail, FAQs, or content sections. Keep essential actions visible rather than hiding everything behind a summary.",
    "The summary is the toggle: focus it with Tab and activate with Enter or Space. Avoid interactive controls inside the title; place them in the expanded content.",
    "Horizontal layouts need room for both summary and content. Use vertical layouts for dense copy or narrow containers. Nested accordions should have distinct, meaningful titles.",
  ],
  WelkAttachment: [
    "Set both maxFiles and maxFileSize when resource limits matter. maxFileSize is per file, in bytes, not a total batch size. multiple=false always limits the picker to one file.",
    "accept is a selection aid, not a security guarantee. Check file content, size, permissions and type again on the server before storing uploads.",
    "Each accepted selection replaces the previous batch. onFilesChange receives the files; build your upload flow and progress reporting separately. Preview URLs are local and are revoked on cleanup.",
    "Image, video and audio previews depend on browser codec support. PDFs and other documents are listed without embedded previews. Clear removes files; native form reset also clears the selection.",
  ],
  WelkAvatar: [
    "Use a person's name or a meaningful identity as alt. The outer span is the accessible image; the internal portrait is decorative to avoid duplicate announcements.",
    "src has priority over icon, and icon has priority over the bundled variant. A custom image URL does not have a library-managed error fallback.",
    "Use a consistent size for rows in a list. Hover growth is decorative and should not be the only indicator that an adjacent action is available.",
  ],
  WelkBadge: [
    "Use badges for short statuses and counts rather than long sentences. Pair semantic colors with text so the meaning does not depend on color alone.",
    "Badges are spans, not buttons or live notifications. Use WelkButton for actions and WelkSnackBar for transient announcements.",
    "If a changing count needs an announcement, add an appropriate aria-live region in the surrounding application. Avoid announcing decorative or frequently changing numbers unnecessarily.",
  ],
  WelkBreadCrumbs: [
    "Order entries from the broadest ancestor to the current page. The last item receives aria-current=page; omit its href if the current page should not be clickable.",
    "Give multiple navigation trails distinct aria-label values. Separators are decorative and are not announced as part of the link labels.",
    "Items are native anchors. Supply your app's real URLs or integrate navigation through the supported anchor handlers; the breadcrumb itself does not include a router.",
  ],
  WelkButton: [
    "Use one primary action per local decision and use secondary or ghost for supporting choices. Always include text that describes the result of activation.",
    "The default type is button. Set type=submit when submitting a form and type=reset only when clearing it is intentional.",
    "Native buttons support Tab, Enter and Space. disabled prevents activation; also prevent duplicate asynchronous work in application state where needed.",
  ],
  WelkCard: [
    "This is an action card, not a generic container: its root is a button. Use it when the whole title/subtitle surface performs one clear action.",
    "Do not nest links, buttons, inputs or other interactive elements inside the card. Use a separate layout container for compound content.",
    "onClick handles activation; keyboard users can activate the focused card with Enter or Space. Provide disabled when the action is not available.",
  ],
  WelkCheckBox: [
    "Use checkboxes for independent choices or multiple selections. For exactly one option from a set, use WelkRadioGroup instead.",
    "Read event.currentTarget.checked in onChange for controlled state. The native value is the form submission value, not the checked boolean.",
    "Indeterminate is a native DOM property set through the forwarded ref; it is not a prop and is independent of checked. Keep a select-all controller synchronized with its child choices.",
  ],
  WelkDateInput: [
    "Use the compact input in forms where a full calendar would take too much space. Use WelkDatePicker when the calendar should remain visible.",
    "Supply valid calendar dates in YYYY-MM-DD for value, defaultValue, min and max. These are date-only strings, not timezone-aware timestamps; avoid converting them through UTC unnecessarily.",
    "Type directly or open the calendar to select a day. Escape dismisses the popup. Keep min at or before max and validate the submitted date in the application.",
  ],
  WelkDatePicker: [
    "Use the visible calendar when picking a day is the primary task. Use WelkDateInput for compact forms.",
    "Values and boundaries are real YYYY-MM-DD calendar dates, not localized display strings or Date objects. Empty string means no selected date; invalid supplied dates throw.",
    "min and max constrain day selection. Provide a visible label and a name for native form submission. Enforce business rules again when processing the form.",
  ],
  WelkDialog: [
    "Use a modal for a focused decision that needs to interrupt the current task. Keep content concise and provide an obvious dismissal or next action.",
    "The parent owns open. onClose synchronizes state after native dismissal. Default footer actions close the dialog; supplying onPress, onYesPress or onNoPress replaces that action's default closing behavior.",
    "The native dialog handles focus containment and Escape. Test the initial focus and return focus in the full application. Do not open several modal examples at once.",
    "closeOnTapOutside is opt-in. Avoid accidental backdrop dismissal for destructive decisions or forms with unsaved data.",
  ],
  WelkDivider: [
    "Use separators to group related content, not as a replacement for headings. Their semantic role conveys a boundary between sections.",
    "A vertical divider needs a height from style or its layout. thickness must be a finite positive pixel value; zero, negative and non-finite values throw.",
    "Plain, dotted and dashed patterns are visual choices rather than status indicators. Use spacing as well as a line to keep dense layouts readable.",
  ],
  WelkDrawer: [
    "Use edge panels for contextual navigation, filters or supporting tools. The current drawer is modal; the rest of the page is unavailable while it is open.",
    "Keep open in parent state and set it false in onClose. Closing plays an exit animation before the native modal is removed; motion preferences are respected.",
    "Try Tab and Escape after opening. Focus stays in the panel, body scrolling is locked, and focus returns to the previous target on close.",
    "Use top or bottom for broad content and left or right for side panels. Backdrop dismissal is opt-in; provide an explicit close path for every configuration.",
  ],
  WelkDropDown: [
    "Option values should be unique, stable strings. Use labels for human-readable names and disabled on choices that are currently unavailable.",
    "Prefer the native select for short lists. searchable helps longer lists; filtering matches labels case-insensitively and does not change the selection until an option is committed.",
    "In searchable mode use arrows to move, Enter to select, and Escape to dismiss. The hidden native select retains form submission and required validation.",
  ],
  WelkIconButton: [
    "label must describe the action, not the icon's shape: use Add item rather than Plus. Icon-only mode uses that label as its accessible name.",
    "Use the text variant when an icon alone may be ambiguous. The icon wrapper is decorative, so avoid embedding an additional accessible label inside it.",
    "This is a native button with type=button by default. Use disabled for unavailable actions and handle application work in onClick.",
  ],
  WelkImage: [
    "Use alt text that explains the image's purpose. Use an empty alt for decorative images and put essential information in surrounding text too.",
    "Reserve layout space with width/height and use a responsive style where needed. Native loading=lazy can defer non-critical images.",
    "Network mode falls back to bundled artwork or fallbackSrc and shows an error label. Asset mode keeps native error handling. Paste a public image URL into the network example to try it; the image host must allow access from your browser.",
  ],
  WelkInput: [
    "Use a visible label even if you also provide a placeholder. Placeholder text is a hint, not an accessible label or a replacement for instructions.",
    "Choose the correct type for browser validation and mobile keyboard behavior. Use autoComplete, required and name when building real forms.",
    "Controlled text fields use value/onChange. End actions need their own descriptive label; for example, toggle a password's visibility without submitting the form.",
    "Use readOnly when a value should remain focusable and copyable; use disabled when the field must be unavailable and excluded from submission.",
  ],
  WelkMenu: [
    "Provide stable route strings and distinct titles. activeRoute matches an exact route; the component does not infer the current URL or install a router.",
    "Use variant=nested to display children. Parent destinations remain available through Go to links, separate from the disclosure toggle.",
    "The collapsible menu starts expanded. Escape closes the nearest open child before collapsing the whole menu, returning focus to its toggle.",
    "The example routes below are intercepted only to keep the demo on this page. Your application should supply real navigation or router-aware click handlers.",
  ],
  WelkOTPInput: [
    "Set length to the exact digit count your service expects. value/defaultValue must be digit-only strings fitting that length; invalid supplied values throw.",
    "The slots are one native input, not separate fields. Paste, selection, autofill and keyboard editing work together; autoComplete defaults to one-time-code.",
    "onComplete signals a filled code, not a verified one. Submit to your verification service, show failures explicitly, and never treat a completed input as authentication.",
  ],
  WelkQRCode: [
    "Pass a complete URL beginning with http:// or https://. The component encodes the supplied string as-is and does not rewrite or shorten it.",
    "The QR code stays black on white for scanning; the surrounding frame uses the WelkUI comic theme. Keep the code unobstructed and leave its white margin intact.",
    "The QR is generated locally in the browser. No URL is sent to a third-party QR service.",
    'Use variant="card" for a framed card layout. title and subtitle are optional, and cardColor accepts any CSS background color; without the card variant, the original appearance is unchanged.',
    "Rounded modules are the default comic treatment and keep the encoded module positions unchanged. Set originalCode to render traditional square pixels.",
  ],
  WelkRadio: [
    "Related options must share a name and have different values. The browser then handles exclusive selection and keyboard movement within the group.",
    "Provide a visible group label through a surrounding fieldset/legend, or use WelkRadioGroup. Individual option labels should be distinct and meaningful.",
    "checked is the boolean selection state; value is the submitted choice. Read currentTarget.checked in onChange when managing individual controlled radios.",
  ],
  WelkRadioGroup: [
    "Use for one choice from a visible set of options. Use a dropdown when the list is long, or checkboxes when multiple choices are allowed.",
    "Each option needs a unique string value. defaultValue selects the initial choice; value/onValueChange makes the group controlled.",
    "The label is rendered as a legend. A shared native name is generated unless supplied; required enables native validation and disabled on the fieldset disables the group.",
  ],
  WelkRangeSlider: [
    "Use for a numeric range where approximate adjustment is natural. Choose min, max and step to match the domain and keep the current value visible when precision matters.",
    "onValueChange returns a number; native onChange is available too. Controlled value/defaultValue use numbers, unlike the string-based date and time fields.",
    "Users can drag, focus the input and use arrow keys, or use native range keyboard shortcuts. Do not communicate the value through track color alone.",
  ],
  WelkSnackBar: [
    "Use for brief, non-blocking feedback. Important errors or tasks requiring a decision should remain visible in the page or use a dialog.",
    "open and onClose are controlled. A positive autoHideDuration is milliseconds; zero means manual dismissal. Hover or focus pauses the timer and leaving restarts its full duration.",
    "There are six viewport anchors and five semantic colors. These examples launch real portaled notifications; close one before opening another to avoid overlap.",
    "The status is announced politely. Keep messages concise, pair color with text, and avoid short auto-dismiss times for important content.",
  ],
  WelkSticker: [
    "Use transparent PNG/WebP artwork for a silhouette cutout. The outline follows the alpha channel, so an opaque rectangular background remains a rectangle.",
    "outlineThickness is a finite non-negative pixel value. outlineColor sets the edge; elevateOnHover is optional decoration rather than an action.",
    "The sticking animation starts after load and honors reduced motion. Supply fallbackSrc when recovery is useful and descriptive alt text unless the artwork is decorative.",
  ],
  WelkStickerCard: [
    "Use for a single card action with decorative character art. The left artwork overlaps the card edge, so leave room around the component rather than clipping its container.",
    "Artwork sizing and empty alt text are managed internally. Card and sticker share hover growth; independent sticker elevation is disabled.",
    "The native card button remains the action target. Do not add interactive elements inside its title/subtitle or assume the overflowing decorative artwork is a separate action.",
  ],
  WelkSwitch: [
    "Use for a setting that takes effect immediately; use a checkbox for choosing an item before a later form submission.",
    "checked/onCheckedChange is a convenient controlled boolean API. Native onChange is also available; defaultChecked leaves state with the input.",
    "The label is clickable and Space toggles the focused switch. Preserve a meaningful label in both states rather than changing its action name each time.",
  ],
  WelkTabs: [
    "Use tabs to switch between related panels in the same context. For navigation between different pages, use links or WelkMenu instead.",
    "The tab list is separated from the panel by a small gap. Use variant=withBg for toggle-style tabs grouped on a shared background; both variants support vertical orientation.",
    "Give the tab list an informative label and each tab a unique value. Use value/onValueChange for controlled selection or defaultValue for local state.",
    "Arrow keys move between enabled tabs, Home and End jump to the first and last enabled tab, and selection follows focus. Vertical tabs use Up and Down.",
  ],
  WelkTimePicker: [
    "Use 24-hour HH:mm strings, or HH:mm:ss when showSeconds is true. Empty string means no time. Supply values matching the chosen precision.",
    "Type directly or open the custom wheels; only three rows are visible in each column. Wheel selection and keyboard interaction update the same value.",
    "Time values do not contain a date, timezone or duration. Combine them with a date/timezone in application logic only when your use case requires it.",
  ],
  WelkTooltip: [
    "Use for short supplemental hints, not essential instructions or interactive content. The content prop is plain text.",
    "Wrap exactly one focusable child that accepts aria-describedby. A native button or WelkButton is a suitable trigger; avoid a non-focusable span as the only access path.",
    "Hover or keyboard focus reveals the hint; Escape dismisses it. Use speech for new code; speach is a supported compatibility spelling of the same shape.",
  ],
} satisfies Record<ComponentName, readonly string[]>;
