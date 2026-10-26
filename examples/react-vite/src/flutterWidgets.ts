/**
 * Base URL of the deployed Flutter example app (web build), for example
 * "https://welkdock.github.io/welkUI-flutter/". Leave empty until it is
 * deployed; widget pages then show a "preview coming soon" state.
 */
export const flutterPreviewUrl = "https://welkdock.github.io/welkUI-flutter/";

export const flutterPackage = {
  name: "welkui_flutter",
  // Update this when a new version is published to pub.dev.
  version: "0.1.5",
  url: "https://pub.dev/packages/welkui_flutter",
  dart: "3.13.4",
  flutter: "3.35.0",
} as const;

export const flutterInstall = `flutter pub add ${flutterPackage.name}`;

export const flutterImport = `import 'package:flutter/material.dart';
import 'package:${flutterPackage.name}/${flutterPackage.name}.dart';`;

export const flutterThemeCode = `WelkTheme(
  data: const WelkThemeData().copyWith(
    accent: const Color(0xFFFFD166),
    ink: const Color(0xFF202020),
    paper: const Color(0xFFFFFDF5),
  ),
  child: WelkButton(
    onPressed: () {},
    child: const Text('Your colors. WelkUI character.'),
  ),
)`;

export const flutterDarkModeCode = statefulExample(
  "DarkMode",
  "WelkThemeData _theme = const WelkThemeData(darkMode: false);",
  `WelkTheme(
      data: _theme,
      child: MaterialApp(
        theme: ThemeData.light(),
        darkTheme: ThemeData.dark(),
        themeMode: _theme.darkMode == true ? ThemeMode.dark : ThemeMode.light,
        home: Scaffold(
          body: Center(
            child: WelkSwitch(
              label: 'Dark mode',
              value: _theme.darkMode == true,
              onChanged: (enabled) {
                setState(() {
                  _theme = _theme.copyWith(darkMode: enabled);
                });
              },
            ),
          ),
        ),
      ),
    )`,
);

export const flutterDarkModeOverrideCode = `WelkButton(
  overRideDarkMode: true,
  variant: WelkButtonVariant.secondary,
  onPressed: () {},
  child: const Text('Always dark'),
)

WelkButton(
  overRideDarkMode: false,
  onPressed: () {},
  child: const Text('Always light'),
)`;

export const flutterFontCode = `const Text(
  'Made with WelkUI',
  style: TextStyle(
    fontFamily: 'ShortStack',
    package: '${flutterPackage.name}',
    fontSize: 20,
  ),
)`;

type Parameter = readonly [
  name: string,
  type: string,
  defaultValue: string,
  description: string,
];

const focusParameters: readonly Parameter[] = [
  ["focusNode", "FocusNode?", "null", "Optional focus node to control focus."],
  ["autofocus", "bool", "false", "Requests focus when first built."],
];

const dateParameters: readonly Parameter[] = [
  ["label", "String", "Required", "Visible field label."],
  [
    "value",
    "DateTime?",
    "Required",
    "Selected local date, or null when empty.",
  ],
  [
    "onChanged",
    "ValueChanged<DateTime?>?",
    "null",
    "Receives valid dates or null when cleared. Null disables the control.",
  ],
  ["minDate", "DateTime?", "null", "Earliest selectable date, inclusive."],
  ["maxDate", "DateTime?", "null", "Latest selectable date, inclusive."],
  [
    "initialDisplayDate",
    "DateTime?",
    "null",
    "Month displayed for an empty field; defaults to today.",
  ],
  [
    "isRequired",
    "bool",
    "false",
    "Prevents clearing and validates an empty value.",
  ],
  [
    "validator",
    "String? Function(DateTime?)?",
    "null",
    "Returns an error message, or null for a valid value.",
  ],
  ...focusParameters,
];

function statefulExample(name: string, fields: string, widget: string) {
  return `class ${name}Example extends StatefulWidget {
  const ${name}Example({super.key});

  @override
  State<${name}Example> createState() => _${name}ExampleState();
}

class _${name}ExampleState extends State<${name}Example> {
  ${fields}

  @override
  Widget build(BuildContext context) {
    return ${widget};
  }
}`;
}

export const flutterWidgets = [
  {
    name: "WelkAccordion",
    previewRoute: "/accordion",
    description:
      "A paper disclosure with vertical, horizontal and nested layouts. Manage expansion locally or control it from your app.",
    design: [
      "Variants: vertical, horizontal and nested",
      "Omit expanded to use initiallyExpanded and local state",
      "Set expanded and onChanged for controlled expansion",
      "Optional outside-click dismissal and fixed panel width",
    ],
    code: `const WelkAccordion(
  title: Text('What is inside?'),
  initiallyExpanded: true,
  child: Text('A little comic magic for your mobile app.'),
)`,
    notes: [
      "Use a descriptive title; the disclosure exposes its expanded state to assistive technology.",
      "Nest another WelkAccordion in child for multi-level disclosures.",
      "fixedWidth must be positive and finite. Test horizontal panels in narrow layouts.",
    ],
    parameters: [
      ["title", "Widget", "Required", "Content of the disclosure header."],
      ["child", "Widget", "Required", "Content shown while expanded."],
      [
        "variant",
        "WelkAccordionVariant",
        "vertical",
        "vertical, horizontal or nested.",
      ],
      [
        "expanded",
        "bool?",
        "null",
        "Controlled expansion state; null uses local state.",
      ],
      [
        "initiallyExpanded",
        "bool",
        "false",
        "Initial state in uncontrolled mode.",
      ],
      [
        "onChanged",
        "ValueChanged<bool>?",
        "null",
        "Receives the requested expansion state.",
      ],
      ["enabled", "bool", "true", "Whether the disclosure can be toggled."],
      [
        "closeOnOutsideClick",
        "bool",
        "false",
        "Closes on interaction outside the disclosure.",
      ],
      [
        "fixedWidth",
        "double?",
        "null",
        "Optional positive, finite panel width.",
      ],
      ...focusParameters,
    ],
  },
  {
    name: "WelkAttachment",
    previewRoute: "/attachment",
    description:
      "File selection and validation UI with attachment previews. Connect your own mobile file picker without coupling the widget to a picker plugin.",
    design: [
      "Single or multiple file selection",
      "Filter extensions or MIME types and limit file sizes or counts",
      "Integrates with Flutter Form validation and saving",
      "Accepts custom image, audio or video preview widgets",
    ],
    code: `WelkAttachment(
  label: const Text('Mission files'),
  accept: '.pdf,image/*',
  maxFileSize: 5 * 1024 * 1024,
  maxFiles: 3,
  initialFiles: const [
    WelkAttachmentFile(
      name: 'brief.pdf',
      size: 2048,
      mimeType: 'application/pdf',
    ),
  ],
  onFilesChange: (files) {
    debugPrint('Selected \${files.length} files');
  },
)`,
    notes: [
      "The example displays an existing attachment. Supply onSelectFiles to enable adding files with your app's platform picker.",
      "onSelectFiles returns Future<List<WelkAttachmentFile>?>; return null when the user cancels.",
      "WelkAttachmentFile requires name and size in bytes, with optional mimeType (default empty) and preview.",
      "This widget does not upload files. Keep file handles and uploads in your application.",
    ],
    parameters: [
      ["label", "Widget", "Required", "Visible attachment field label."],
      [
        "onSelectFiles",
        "Future<List<WelkAttachmentFile>?> Function()?",
        "null",
        "Opens your application's picker. Null disables file selection.",
      ],
      [
        "onFilesChange",
        "ValueChanged<List<WelkAttachmentFile>>?",
        "null",
        "Receives the selected list after additions or removals.",
      ],
      ["multiple", "bool", "true", "Allows multiple attachments."],
      [
        "accept",
        "String?",
        "null",
        "Comma-separated extensions, MIME types or MIME wildcards.",
      ],
      [
        "maxFileSize",
        "int?",
        "null",
        "Positive maximum size per file, in bytes.",
      ],
      ["maxFiles", "int?", "null", "Positive maximum attachment count."],
      ["disabled", "bool", "false", "Disables attachment interactions."],
      [
        "isRequired",
        "bool",
        "false",
        "Requires at least one file during validation.",
      ],
      [
        "initialFiles",
        "List<WelkAttachmentFile>",
        "[]",
        "Initial attachments; not a controlled value.",
      ],
      [
        "validator",
        "FormFieldValidator<List<WelkAttachmentFile>>?",
        "null",
        "Additional Form validation.",
      ],
      [
        "onSaved",
        "FormFieldSetter<List<WelkAttachmentFile>>?",
        "null",
        "Called when the enclosing Form is saved.",
      ],
      [
        "autovalidateMode",
        "AutovalidateMode",
        "disabled",
        "When FormField validation runs.",
      ],
    ],
  },
  {
    name: "WelkAvatar",
    previewRoute: "/avatar",
    description:
      "A circular portrait with an ink outline and hard shadow. Choose bundled character art, a custom image or an icon.",
    design: [
      "Portraits: user, maleUser, femaleUser, maleAdmin and femaleAdmin",
      "Sizes: small (32), medium (48) and large (64 logical pixels)",
      "Optional background color and hover growth",
    ],
    code: `const WelkAvatar(
  alt: 'Workspace administrator',
  variant: WelkAvatarVariant.femaleAdmin,
  size: WelkAvatarSize.large,
)`,
    notes: [
      "Provide meaningful alt text for the person or role.",
      "Bundled portraits need no asset registration in your app.",
      "Use image for an ImageProvider or icon for custom widget content.",
    ],
    parameters: [
      ["alt", "String", "Required", "Accessible image description."],
      ["image", "ImageProvider?", "null", "Custom portrait image."],
      ["icon", "Widget?", "null", "Custom icon content."],
      [
        "variant",
        "WelkAvatarVariant",
        "user",
        "Bundled portrait when no custom content is supplied.",
      ],
      ["size", "WelkAvatarSize", "medium", "small, medium or large."],
      ["color", "Color?", "null", "Background color override."],
      [
        "growOnHover",
        "bool",
        "false",
        "Enables hover growth on pointer devices.",
      ],
    ],
  },
  {
    name: "WelkBadge",
    previewRoute: "/badge",
    description:
      "A tilted, hard-shadowed status label with wrapping content, semantic colors and three sizes.",
    design: [
      "Variants: defaultStyle, info, success, warning and error",
      "Sizes: small, medium and large",
      "Long labels wrap within the available width",
    ],
    code: `const WelkBadge(
  variant: WelkBadgeVariant.success,
  semanticLabel: 'Mission status: complete',
  child: Text('Complete'),
)`,
    notes: [
      "Use text as well as color to communicate status.",
      "semanticLabel replaces child semantics, useful for counts or abbreviated labels.",
      "Badges are informational rather than interactive buttons.",
    ],
    parameters: [
      ["child", "Widget", "Required", "Badge content."],
      [
        "variant",
        "WelkBadgeVariant",
        "defaultStyle",
        "defaultStyle, info, success, warning or error.",
      ],
      ["size", "WelkBadgeSize", "medium", "small, medium or large."],
      [
        "semanticLabel",
        "String?",
        "null",
        "Accessible label replacing child semantics when supplied.",
      ],
    ],
  },
  {
    name: "WelkBreadCrumbs",
    previewRoute: "/breadcrumbs",
    description:
      "A wrapping navigation trail that marks its final item as the current page. The application owns navigation callbacks.",
    design: [
      "Wraps onto additional lines on narrow screens",
      "Custom separators and disabled destinations",
      "Final item represents the current page",
    ],
    code: `WelkBreadCrumbs(
  items: [
    WelkBreadCrumbItem(
      label: const Text('Home'),
      onPressed: () => Navigator.of(context).pushNamed('/'),
    ),
    const WelkBreadCrumbItem(label: Text('Workspace')),
  ],
)`,
    notes: [
      "WelkBreadCrumbItem requires a Widget label; onPressed defaults to null and enabled to true.",
      "Register destinations in your app before invoking Navigator.pushNamed.",
      "Use semanticLabel to name the navigation trail for screen readers.",
    ],
    parameters: [
      [
        "items",
        "List<WelkBreadCrumbItem>",
        "Required",
        "Navigation trail in ancestor-to-current order.",
      ],
      ["separator", "Widget", "Text('/')", "Separator between destinations."],
      [
        "semanticLabel",
        "String",
        "'Breadcrumb'",
        "Accessible name of the navigation region.",
      ],
    ],
  },
  {
    name: "WelkButton",
    previewRoute: "/button",
    description:
      "A slightly tilted, outlined button with a solid shadow that compresses on tap. Matches the WelkUI React button.",
    design: [
      "Variants: primary, secondary, error, warning, ghost, info and success",
      "Sizes: small, medium and large",
      "Tap: shifts down-right while its hard shadow compresses",
      "Ghost keeps the WelkUI outline and hard shadow",
      "A null onPressed disables interaction",
    ],
    code: `WelkButton(
  variant: WelkButtonVariant.primary,
  size: WelkButtonSize.medium,
  onPressed: () {},
  child: const Text('Save changes'),
)`,
    notes: [
      "Use a short, action-focused label. Icon-only children need a Semantics label.",
      "Touch targets are at least 48 logical pixels.",
      "Supports keyboard focus, text scaling and reduced motion.",
    ],
    parameters: [
      [
        "child",
        "Widget",
        "Required",
        "Button content: text, or an icon and text composition.",
      ],
      [
        "onPressed",
        "VoidCallback?",
        "null",
        "Called on tap. Null disables the button.",
      ],
      [
        "variant",
        "WelkButtonVariant",
        "primary",
        "primary, secondary, error, warning, ghost, info or success.",
      ],
      ["size", "WelkButtonSize", "medium", "small, medium or large."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkCard",
    previewRoute: "/card",
    description:
      "A paper card with asymmetric corners, an optional icon and wrapping content. Add onPressed to make it actionable.",
    design: [
      "Informational: omit onPressed; stays fully opaque without button semantics",
      "Actionable: provide onPressed; tap translates the card and compresses its shadow",
      "Disabled action: provide onPressed and set enabled: false",
      "No tap animation: set enableFeedback: false; the action still works",
    ],
    code: `WelkCard(
  title: 'Your workspace',
  subtitle: 'Manage members, projects, and settings in one place.',
  icon: const Icon(Icons.arrow_forward),
  onPressed: () {},
  enableFeedback: true,
)`,
    notes: [
      "Long titles and subtitles wrap instead of overflowing.",
      "Actionable cards get button semantics and keyboard focus.",
      "Tap feedback respects the platform's reduced-motion setting.",
    ],
    parameters: [
      ["title", "String", "Required", "Bold card title."],
      ["subtitle", "String", "Required", "Supporting text below the title."],
      ["icon", "Widget?", "null", "Optional icon in the top trailing corner."],
      [
        "onPressed",
        "VoidCallback?",
        "null",
        "Makes the card actionable. Omit for an informational card.",
      ],
      [
        "enabled",
        "bool",
        "true",
        "Set to false together with onPressed to show a disabled action card.",
      ],
      [
        "enableFeedback",
        "bool",
        "true",
        "Whether actionable cards animate down and compress their shadow on tap.",
      ],
      ...focusParameters,
    ],
  },
  {
    name: "WelkCheckBox",
    previewRoute: "/checkbox",
    description:
      "A controlled checkbox with a visible label, a mixed selection state and a comfortable mobile touch target.",
    design: [
      "Unchecked, checked and indeterminate states",
      "Null onChanged or disabled: true disables interaction",
      "Tapping a mixed checkbox requests true",
    ],
    code: statefulExample(
      "CheckBox",
      "bool _included = false;",
      `WelkCheckBox(
      label: 'Count me in',
      value: _included,
      onChanged: (value) => setState(() => _included = value),
    )`,
    ),
    notes: [
      "The parent must update value when onChanged fires.",
      "indeterminate is a visual mixed state separate from value.",
      "Keep the label descriptive; the label and control form one accessible interaction.",
    ],
    parameters: [
      ["value", "bool", "Required", "Controlled checked state."],
      ["label", "String", "Required", "Visible label and accessible name."],
      [
        "onChanged",
        "ValueChanged<bool>?",
        "null",
        "Receives the requested value. Null disables interaction.",
      ],
      ["indeterminate", "bool", "false", "Displays a mixed selection state."],
      ["disabled", "bool", "false", "Disables the checkbox and label."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkDateInput",
    previewRoute: "/date-input",
    description:
      "An editable date field with a dismissible mobile calendar dialog. Invalid text remains visible without changing the selected date.",
    design: [
      "Calendar opens from its button, not while typing",
      "Inclusive minimum and maximum dates",
      "Required-value and custom validation support",
    ],
    code: statefulExample(
      "DateInput",
      "DateTime? _date;",
      `WelkDateInput(
      label: 'Mission date',
      value: _date,
      minDate: DateTime(2026, 1, 1),
      maxDate: DateTime(2027, 12, 31),
      onChanged: (value) => setState(() => _date = value),
    )`,
    ),
    notes: [
      "Dates are local civil dates; time-of-day and UTC offsets are ignored.",
      "Type YYYY-MM-DD. Invalid and out-of-range edits are not emitted.",
      "Null onChanged disables both text editing and the calendar button.",
      "Use WelkDatePicker when the calendar should stay inline.",
    ],
    parameters: dateParameters,
  },
  {
    name: "WelkDatePicker",
    previewRoute: "/date-picker",
    description:
      "An inline calendar with an editable YYYY-MM-DD field, controlled selection and date bounds.",
    design: [
      "Calendar stays visible in the page",
      "Month navigation and keyboard-operable date selection",
      "Required-value and custom validation support",
    ],
    code: statefulExample(
      "DatePicker",
      "DateTime? _date;",
      `WelkDatePicker(
      label: 'Departure date',
      value: _date,
      onChanged: (value) => setState(() => _date = value),
    )`,
    ),
    notes: [
      "Dates represent local civil days, not timestamps.",
      "Invalid drafts and dates outside minDate/maxDate are never emitted.",
      "Null onChanged disables text editing and calendar selection.",
      "Use WelkDateInput for a compact field that opens a calendar dialog.",
    ],
    parameters: dateParameters,
  },
  {
    name: "WelkDialog",
    previewRoute: "/dialog",
    description:
      "A paper modal surface for alerts and confirmations. Present it with showWelkDialog for modal focus handling and dismissal.",
    design: [
      "Variants: alert, info, warning, error and success",
      "Types: standard and confirmation",
      "Custom close, primary, yes and no actions",
    ],
    code: `WelkButton(
  onPressed: () async {
    await showWelkDialog<void>(
      context: context,
      builder: (dialogContext) => const WelkDialog(
        title: Text('Mission complete'),
        variant: WelkDialogVariant.success,
        child: Text('Your changes have been saved.'),
      ),
    );
  },
  child: const Text('Show dialog'),
)`,
    notes: [
      "showWelkDialog requires context and builder; closeOnTapOutside defaults to false and useRootNavigator to true.",
      "Custom action callbacks replace automatic dismissal. Pop the dialog navigator yourself when an action should close it.",
      "The helper traps modal focus and restores it after dismissal; test Android back and screen-reader navigation.",
    ],
    parameters: [
      ["title", "Widget", "Required", "Dialog heading."],
      ["child", "Widget?", "null", "Dialog body."],
      [
        "variant",
        "WelkDialogVariant",
        "alert",
        "alert, info, warning, error or success.",
      ],
      ["type", "WelkDialogType", "standard", "standard or confirmation."],
      [
        "onClose",
        "VoidCallback?",
        "null",
        "Custom close behavior; defaults to Navigator.pop.",
      ],
      [
        "closeLabel",
        "String",
        "'Close dialog'",
        "Accessible name of the close action.",
      ],
      ["buttonText", "String", "'Okay'", "Standard action label."],
      [
        "onPressed",
        "VoidCallback?",
        "null",
        "Standard action override; defaults to closing.",
      ],
      ["yesText", "String", "'Yes'", "Confirmation positive label."],
      ["noText", "String", "'No'", "Confirmation negative label."],
      ["onYesPressed", "VoidCallback?", "null", "Positive action override."],
      ["onNoPressed", "VoidCallback?", "null", "Negative action override."],
    ],
  },
  {
    name: "WelkDivider",
    previewRoute: "/divider",
    description:
      "A plain, dotted or dashed separator with horizontal and vertical orientations.",
    design: [
      "Variants: plain, dotted and dashed",
      "Horizontal fills bounded width by default",
      "Vertical defaults to 32 logical pixels long",
    ],
    code: `const WelkDivider(
  variant: WelkDividerVariant.dashed,
  thickness: 3,
  semanticLabel: 'End of mission details',
)`,
    notes: [
      "Use a positive, finite thickness and a non-negative, finite length.",
      "Set length explicitly for vertical separators or unbounded horizontal layouts.",
      "semanticLabel defaults to Separator when omitted.",
    ],
    parameters: [
      ["orientation", "Axis", "horizontal", "horizontal or vertical."],
      ["variant", "WelkDividerVariant", "plain", "plain, dotted or dashed."],
      ["thickness", "double", "2", "Stroke thickness in logical pixels."],
      ["length", "double?", "null", "Explicit extent along the divider axis."],
      ["color", "Color?", "null", "Stroke color; defaults to theme ink."],
      ["semanticLabel", "String?", "null", "Accessible separator description."],
    ],
  },
  {
    name: "WelkDrawer",
    previewRoute: "/drawer",
    description:
      "A scrollable modal edge panel with a paper surface. Open it from any edge using showWelkDrawer.",
    design: [
      "Positions: left, right, top and bottom",
      "Modal focus handling, Android back and Escape dismissal",
      "Slide and fade transitions respect reduced motion",
    ],
    code: `WelkButton(
  onPressed: () async {
    await showWelkDrawer<void>(
      context: context,
      position: WelkDrawerPosition.right,
      builder: (drawerContext) => const WelkDrawer(
        title: Text('Mission details'),
        child: Text('Everything your crew needs to know.'),
      ),
    );
  },
  child: const Text('Open drawer'),
)`,
    notes: [
      "showWelkDrawer requires context and builder; position defaults to right, closeOnTapOutside to false and useRootNavigator to true.",
      "Set position on the helper to choose the entrance edge; it supplies that placement to the drawer.",
      "Custom onClose replaces Navigator.pop; dismiss the route yourself when overriding it.",
    ],
    parameters: [
      ["title", "Widget", "Required", "Drawer heading."],
      ["child", "Widget", "Required", "Scrollable drawer body."],
      [
        "position",
        "WelkDrawerPosition",
        "right",
        "Inline placement; the showWelkDrawer helper supplies its position when presented modally.",
      ],
      [
        "onClose",
        "VoidCallback?",
        "null",
        "Custom close behavior; defaults to Navigator.pop.",
      ],
      [
        "closeLabel",
        "String",
        "'Close drawer'",
        "Accessible name of the close action.",
      ],
    ],
  },
  {
    name: "WelkDropDown",
    previewRoute: "/dropdown",
    description:
      "A controlled select with a dismissible, viewport-clamped popup, optional local search and disabled options.",
    design: [
      "Standard and searchable option lists",
      "Popup stays inside the viewport",
      "Disabled options are skipped during keyboard navigation",
    ],
    code: statefulExample(
      "DropDown",
      "String? _role;",
      `WelkDropDown(
      label: 'Mission role',
      value: _role,
      searchable: true,
      options: const [
        WelkDropDownOption(value: 'hero', label: 'Hero'),
        WelkDropDownOption(value: 'sidekick', label: 'Sidekick'),
      ],
      onChanged: (value) => setState(() => _role = value),
    )`,
    ),
    notes: [
      "WelkDropDownOption requires String value and label; disabled defaults to false.",
      "Keep option values unique and update value from onChanged.",
      "Changing options, selection or availability closes an open popup.",
      "Null onChanged or disabled: true disables selection.",
    ],
    parameters: [
      ["label", "String", "Required", "Visible label."],
      [
        "options",
        "List<WelkDropDownOption>",
        "Required",
        "Selectable options.",
      ],
      ["value", "String?", "Required", "Selected option value, or null."],
      [
        "onChanged",
        "ValueChanged<String>?",
        "null",
        "Receives the selected option value.",
      ],
      ["searchable", "bool", "false", "Enables local option filtering."],
      [
        "placeholder",
        "String",
        "'Select an option'",
        "Text when no option is selected.",
      ],
      ["disabled", "bool", "false", "Disables the select."],
      ["isRequired", "bool", "false", "Marks the field as required."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkIconButton",
    previewRoute: "/icon-button",
    description:
      "An icon action with a hard shadow, press feedback and a required accessible label. Its 44-pixel artwork has a 48-pixel touch target.",
    design: [
      "Variants: standard and text",
      "WelkIconButton.close provides the modal close treatment",
      "Null onPressed disables the action",
    ],
    code: `WelkIconButton(
  icon: const Icon(Icons.favorite),
  label: 'Save to favorites',
  onPressed: () {},
)`,
    notes: [
      "label is the accessible action name, not visible button text.",
      "WelkIconButton.close requires label and accepts onPressed, focusNode, autofocus and dialog (default false).",
      "Use dialog: true only on the close constructor for the dialog-specific surface.",
    ],
    parameters: [
      [
        "icon",
        "Widget",
        "Required",
        "Icon content; supplied automatically by the close constructor.",
      ],
      ["label", "String", "Required", "Accessible action name."],
      [
        "onPressed",
        "VoidCallback?",
        "null",
        "Tap callback. Null disables interaction.",
      ],
      [
        "variant",
        "WelkIconButtonVariant",
        "standard",
        "standard or text; standard constructor only.",
      ],
      ...focusParameters,
    ],
  },
  {
    name: "WelkImage",
    previewRoute: "/image",
    description:
      "Network and asset images with asymmetric outlines and hard shadows. Failed network images use a stable comic fallback.",
    design: [
      "WelkImage.network loads a URL; WelkImage.asset loads an asset",
      "Defaults to a 4:3 frame unless both dimensions are supplied",
      "Five bundled comic fallbacks or a custom fallback asset",
    ],
    code: `const WelkImage.asset(
  'assets/fallbacks/comic_bg_02.jpg',
  package: 'welkui_flutter',
  width: 280,
  height: 210,
  semanticLabel: 'Comic-style mission artwork',
)`,
    notes: [
      "Both constructors take source as their first positional argument.",
      "For network images, Android release apps need the INTERNET manifest permission.",
      "A network fallback is selected once per failed source. Fallback asset errors are surfaced rather than replaced recursively.",
      "App assets must be registered in your pubspec; use package for assets bundled in another package.",
    ],
    parameters: [
      [
        "source",
        "String (positional)",
        "Required",
        "Network URL or asset path, depending on constructor.",
      ],
      [
        "package",
        "String?",
        "null",
        "Asset constructor only: owning asset package.",
      ],
      [
        "fallbackAsset",
        "String?",
        "null",
        "Network constructor only: custom failure asset.",
      ],
      [
        "fallbackPackage",
        "String?",
        "null",
        "Network constructor only: package owning the fallback asset.",
      ],
      ["width", "double?", "null", "Frame width in logical pixels."],
      ["height", "double?", "null", "Frame height in logical pixels."],
      ["fit", "BoxFit", "cover", "How the image fills its frame."],
      [
        "alignment",
        "AlignmentGeometry",
        "center",
        "Alignment within the frame.",
      ],
      ["semanticLabel", "String?", "null", "Accessible image description."],
      [
        "excludeFromSemantics",
        "bool",
        "false",
        "Excludes decorative artwork from screen readers.",
      ],
    ],
  },
  {
    name: "WelkInput",
    previewRoute: "/input",
    description:
      "A controlled single-line text editor with paper styling, input types, validation messages and an optional labelled trailing action.",
    design: [
      "Types: text, email, password, search, tel and url",
      "Disabled, read-only, required and invalid states",
      "Native editing, autofill, input formatting and submission",
    ],
    code: statefulExample(
      "Input",
      "String _name = '';",
      `WelkInput(
      label: 'Hero name',
      placeholder: 'Your secret identity',
      value: _name,
      onChanged: (value) => setState(() => _name = value),
      endAction: WelkInputAction(
        icon: const Icon(Icons.close),
        label: 'Clear name',
        onPressed: () => setState(() => _name = ''),
      ),
    )`,
    ),
    notes: [
      "value is the source of truth; update it from onChanged to accept edits.",
      "WelkInputAction requires icon, label and onPressed; disabled defaults to false.",
      "Set invalid and errorText from your app's validation; this widget is not a FormField.",
      "Use a visible label even when placeholder text is present.",
    ],
    parameters: [
      ["label", "String", "Required", "Visible input label."],
      ["value", "String", "Required", "Controlled text value."],
      ["onChanged", "ValueChanged<String>?", "null", "Receives edited text."],
      [
        "type",
        "WelkInputType",
        "text",
        "text, email, password, search, tel or url.",
      ],
      ["placeholder", "String?", "null", "Hint shown in an empty editor."],
      [
        "endAction",
        "WelkInputAction?",
        "null",
        "Independently labelled trailing action.",
      ],
      ["disabled", "bool", "false", "Disables editing and actions."],
      [
        "readOnly",
        "bool",
        "false",
        "Allows reading and selection without editing.",
      ],
      ["invalid", "bool", "false", "Marks the field as invalid."],
      ["errorText", "String?", "null", "Validation error message."],
      ["isRequired", "bool", "false", "Marks the field as required."],
      ...focusParameters,
      [
        "onSubmitted",
        "ValueChanged<String>?",
        "null",
        "Receives text when the keyboard action is submitted.",
      ],
      [
        "textInputAction",
        "TextInputAction?",
        "null",
        "Native keyboard action.",
      ],
      ["autofillHints", "Iterable<String>?", "null", "Native autofill hints."],
      [
        "inputFormatters",
        "List<TextInputFormatter>?",
        "null",
        "Native editing filters; import flutter/services.dart for formatter classes.",
      ],
    ],
  },
  {
    name: "WelkMenu",
    previewRoute: "/menu",
    description:
      "Navigation with crisp separators, accent-filled active destinations and nested paper panels. Works with any router.",
    design: [
      "Standard (default): displays root destinations only",
      "Nested: expandable branches with links to parent and child destinations",
      "collapsible: true adds a menu toggle; initially expanded",
      "activeRoute highlights the matching destination",
      "288 logical pixels wide, capped by the available space",
    ],
    code: `WelkMenu(
  items: const [
    WelkMenuItem(title: 'Home', route: '/'),
    WelkMenuItem(
      title: 'Workspace',
      route: '/workspace',
      children: [
        WelkMenuItem(title: 'Members', route: '/members'),
        WelkMenuItem(title: 'Settings', route: '/settings'),
      ],
    ),
  ],
  variant: WelkMenuVariant.nested,
  collapsible: true,
  activeRoute: '/members',
  onSelected: (route) => Navigator.of(context).pushNamed(route),
)`,
    notes: [
      "The parent owns navigation and activeRoute. Register destinations with your app's navigator.",
      "Routes must be unique within each menu. WelkMenuItem takes title, route and optional children.",
      "Branches dismiss on outside interaction or selection.",
      "Keyboard: Tab to move, Enter or Space to activate, Escape to dismiss.",
    ],
    parameters: [
      [
        "items",
        "List<WelkMenuItem>",
        "Required",
        "Destinations. Each has a title, a unique route and optional children.",
      ],
      [
        "onSelected",
        "ValueChanged<String>?",
        "Required",
        "Called once with the selected route. Pass null to disable destinations.",
      ],
      ["variant", "WelkMenuVariant", "standard", "standard or nested."],
      [
        "activeRoute",
        "String?",
        "null",
        "Route of the highlighted destination.",
      ],
      ["collapsible", "bool", "false", "Adds a toggle to collapse the menu."],
      [
        "semanticLabel",
        "String",
        "'Main navigation'",
        "Accessible name of the navigation region.",
      ],
    ],
  },
  {
    name: "WelkOTPInput",
    previewRoute: "/otp-input",
    description:
      "A one-time-code editor with hand-drawn digit slots over one native text field, preserving paste, selection, backspace and autofill.",
    design: [
      "Six digits by default; configurable positive length",
      "Completion callback when all slots are filled",
      "Disabled, read-only and invalid states",
    ],
    code: statefulExample(
      "OTPInput",
      "String _code = '';",
      `WelkOTPInput(
      label: 'Verification code',
      value: _code,
      onChanged: (value) => setState(() => _code = value),
      onComplete: (value) => debugPrint('Code complete'),
    )`,
    ),
    notes: [
      "value must contain only digits and must not exceed length.",
      "Update value from onChanged; verify the code through your application's authentication flow.",
      "Avoid logging real verification codes or treating onComplete as successful verification.",
    ],
    parameters: [
      [
        "label",
        "String",
        "Required",
        "Visible label and accessible editor name.",
      ],
      ["value", "String", "Required", "Controlled digit string."],
      ["length", "int", "6", "Positive number of digit slots."],
      ["onChanged", "ValueChanged<String>?", "null", "Receives edited digits."],
      [
        "onComplete",
        "ValueChanged<String>?",
        "null",
        "Receives a complete digit string.",
      ],
      ["disabled", "bool", "false", "Disables editing."],
      [
        "readOnly",
        "bool",
        "false",
        "Prevents editing without disabling the field.",
      ],
      ["invalid", "bool", "false", "Marks the code as invalid."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkQRCode",
    previewRoute: "/qr-code",
    description:
      "A locally encoded, scannable QR code for HTTP(S) URLs, with a four-module quiet zone and optional comic card treatment.",
    design: [
      "Variants: standard and card",
      "Rounded modules by default; originalCode uses square modules",
      "Invalid or oversized URLs display a validation message",
    ],
    code: `const WelkQRCode(
  url: 'https://ui.welkdock.com/flutter/',
  variant: WelkQRCodeVariant.card,
  title: 'Scan for comic magic',
  subtitle: 'Explore WelkUI Flutter',
  size: 192,
)`,
    notes: [
      "Encoding happens locally with the Dart qr package, without a remote QR service.",
      "Only HTTP and HTTPS URLs are accepted; invalid input produces a visible error instead of an unscannable pattern.",
      "Preserve the quiet zone and test scanning at the size used in your app.",
    ],
    parameters: [
      ["url", "String", "Required", "HTTP(S) URL to encode."],
      ["variant", "WelkQRCodeVariant", "standard", "standard or card."],
      ["title", "String?", "null", "Optional card heading."],
      ["subtitle", "String?", "null", "Optional card supporting text."],
      ["cardColor", "Color?", "null", "Card background override."],
      [
        "originalCode",
        "bool",
        "false",
        "Uses square rather than rounded QR modules.",
      ],
      ["size", "double", "192", "Positive, finite QR size in logical pixels."],
    ],
  },
  {
    name: "WelkRadio",
    previewRoute: "/radio",
    description:
      "A controlled labelled radio option with a hand-drawn circular control. Activating an already selected radio is a no-op.",
    design: [
      "Selected, unselected and disabled states",
      "Parent owns selection across related options",
      "Label and radio activate together",
    ],
    code: statefulExample(
      "Radio",
      "bool _selected = false;",
      `WelkRadio(
      label: 'Be a hero',
      selected: _selected,
      onChanged: (value) => setState(() => _selected = value),
    )`,
    ),
    notes: [
      "Use WelkRadioGroup for a labelled set with shared value and arrow-key navigation.",
      "Null onChanged or disabled: true disables interaction.",
      "Selecting an option requests true; tapping it again does not deselect it.",
    ],
    parameters: [
      ["selected", "bool", "Required", "Controlled selection state."],
      ["label", "String", "Required", "Visible option label."],
      [
        "onChanged",
        "ValueChanged<bool>?",
        "null",
        "Receives the requested selection.",
      ],
      ["disabled", "bool", "false", "Disables the radio and label."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkRadioGroup",
    previewRoute: "/radio-group",
    description:
      "A controlled, labelled group of radio options with wrapping arrow-key navigation and disabled-option skipping.",
    design: [
      "One shared String value for the group",
      "Individual options or the entire group can be disabled",
      "Required selection indicator",
    ],
    code: statefulExample(
      "RadioGroup",
      "String? _role;",
      `WelkRadioGroup(
      label: 'Choose your role',
      value: _role,
      options: const [
        WelkRadioOption(value: 'hero', label: 'Hero'),
        WelkRadioOption(value: 'sidekick', label: 'Sidekick'),
      ],
      onChanged: (value) => setState(() => _role = value),
    )`,
    ),
    notes: [
      "WelkRadioOption requires String value and label; disabled defaults to false.",
      "Option values must be unique; update value in onChanged.",
      "Arrow keys wrap between enabled options; Home and End navigate to the edges.",
    ],
    parameters: [
      ["label", "String", "Required", "Accessible and visible group label."],
      [
        "options",
        "List<WelkRadioOption>",
        "Required",
        "Radio choices with unique values.",
      ],
      ["value", "String?", "Required", "Selected option value, or null."],
      [
        "onChanged",
        "ValueChanged<String>?",
        "null",
        "Receives the selected option value. Null disables the group.",
      ],
      ["disabled", "bool", "false", "Disables all options."],
      ["isRequired", "bool", "false", "Marks the group as required."],
    ],
  },
  {
    name: "WelkRangeSlider",
    previewRoute: "/range-slider",
    description:
      "A controlled single-thumb numeric slider with stepped values, a visible label and keyboard and screen-reader adjustments.",
    design: [
      "Configurable minimum, maximum and step",
      "Single value, not a two-ended interval",
      "Optional accessible value formatter",
    ],
    code: statefulExample(
      "RangeSlider",
      "double _volume = 50;",
      `WelkRangeSlider(
      label: 'Volume',
      value: _volume,
      step: 5,
      semanticFormatter: (value) => '\${value.round()} percent',
      onChanged: (value) => setState(() => _volume = value),
    )`,
    ),
    notes: [
      "min must be less than max; step must be positive and value must stay within bounds.",
      "Values snap to a grid starting at min; max need not lie on that grid.",
      "Null onChanged or disabled: true disables adjustments.",
    ],
    parameters: [
      ["label", "String", "Required", "Visible slider label."],
      ["value", "double", "Required", "Controlled numeric value."],
      [
        "onChanged",
        "ValueChanged<double>?",
        "null",
        "Receives the requested snapped value.",
      ],
      ["min", "double", "0", "Lower bound."],
      ["max", "double", "100", "Upper bound."],
      ["step", "double", "1", "Positive increment."],
      ["disabled", "bool", "false", "Disables the slider."],
      ...focusParameters,
      [
        "semanticFormatter",
        "String Function(double)?",
        "null",
        "Formats the value for assistive technology.",
      ],
    ],
  },
  {
    name: "WelkSnackBar",
    previewRoute: "/snackbar",
    description:
      "A non-modal comic notification. Use showWelkSnackBar for centered top or bottom overlays above content and the keyboard.",
    design: [
      "Variants: standard, info, success, warning and error",
      "Overlay positions: top and bottom",
      "Manual dismissal or optional auto-hide duration",
    ],
    code: `WelkButton(
  onPressed: () {
    showWelkSnackBar(
      context: context,
      message: const Text('Changes saved'),
      variant: WelkSnackBarVariant.success,
      position: WelkSnackBarPosition.bottom,
      autoHideDuration: const Duration(seconds: 5),
    );
  },
  child: const Text('Show notification'),
)`,
    notes: [
      "showWelkSnackBar requires context and message and returns a WelkSnackBarController with close() and a closed future.",
      "The helper accepts variant, position (bottom by default), autoHideDuration and closeLabel. Position belongs to the helper, not the widget constructor.",
      "Duration.zero keeps the notification visible. Auto-hide pauses on hover or focus and is suppressed when accessible navigation is enabled.",
      "For inline placement, render WelkSnackBar directly and remove it from your tree in onClose.",
    ],
    parameters: [
      ["message", "Widget", "Required", "Notification content."],
      [
        "onClose",
        "VoidCallback",
        "Required",
        "Dismisses or removes the inline notification.",
      ],
      [
        "variant",
        "WelkSnackBarVariant",
        "standard",
        "standard, info, success, warning or error.",
      ],
      [
        "autoHideDuration",
        "Duration",
        "Duration.zero",
        "Non-negative duration; zero disables auto-hide.",
      ],
      [
        "closeLabel",
        "String",
        "'Dismiss notification'",
        "Accessible name of the close action.",
      ],
    ],
  },
  {
    name: "WelkSticker",
    previewRoute: "/sticker",
    description:
      "An image sticker with a true alpha-contoured outline rather than a rectangular border, optional fallback art and hover elevation.",
    design: [
      "Configurable outline thickness and color",
      "Retries a failed primary image once with fallbackImage",
      "Bundled transparent superhero artwork",
    ],
    code: `const WelkSticker(
  image: AssetImage(
    'assets/stickers/superman.png',
    package: 'welkui_flutter',
  ),
  alt: 'Superman sticker',
  width: 128,
  height: 128,
)`,
    notes: [
      "Use transparent artwork to make the contoured outline visible.",
      "Supply meaningful alt text; use empty alt for purely decorative stickers.",
      "Width and height must be positive and finite; outlineThickness must be non-negative and finite.",
      "onLoad and onError let your application observe image loading outcomes.",
    ],
    parameters: [
      ["image", "ImageProvider", "Required", "Primary sticker image."],
      ["alt", "String", "Required", "Accessible image description."],
      [
        "fallbackImage",
        "ImageProvider?",
        "null",
        "Image tried after primary loading fails.",
      ],
      ["width", "double", "160", "Sticker width in logical pixels."],
      ["height", "double", "160", "Sticker height in logical pixels."],
      [
        "outlineThickness",
        "double",
        "6",
        "Width of the alpha-contoured outline.",
      ],
      ["outlineColor", "Color", "white", "Color of the sticker outline."],
      [
        "elevateOnHover",
        "bool",
        "false",
        "Adds hover elevation on pointer devices.",
      ],
      [
        "onLoad",
        "VoidCallback?",
        "null",
        "Called when image loading succeeds.",
      ],
      [
        "onError",
        "ValueChanged<Object>?",
        "null",
        "Receives image loading errors.",
      ],
    ],
  },
  {
    name: "WelkStickerCard",
    previewRoute: "/sticker-card",
    description:
      "A responsive paper card with overhanging sticker art at its directional start. Add a callback to make the card actionable.",
    design: [
      "Informational or actionable cards",
      "Art stacks in narrow layouts or at large text scales",
      "Optional icon, custom outline and hover growth",
    ],
    code: `WelkStickerCard(
  title: 'Hello, hero.',
  subtitle: 'Your next great mission starts here.',
  sticker: const AssetImage(
    'assets/stickers/superman.png',
    package: 'welkui_flutter',
  ),
  onPressed: () {},
)`,
    notes: [
      "The sticker is decorative; communicate the card's meaning in title and subtitle.",
      "Omit onPressed for informational content. Set enabled: false to disable an actionable card.",
      "Test long content, RTL and large system text; layout adapts to available width.",
    ],
    parameters: [
      ["title", "String", "Required", "Card heading."],
      ["subtitle", "String", "Required", "Supporting text."],
      [
        "sticker",
        "ImageProvider",
        "Required",
        "Overhanging decorative artwork.",
      ],
      ["fallbackImage", "ImageProvider?", "null", "Fallback sticker artwork."],
      ["icon", "Widget?", "null", "Optional trailing card icon."],
      ["onPressed", "VoidCallback?", "null", "Makes the card actionable."],
      ["enabled", "bool", "true", "Enables the card action."],
      [
        "growOnHover",
        "bool",
        "true",
        "Enables hover growth on pointer devices.",
      ],
      ["outlineThickness", "double", "6", "Sticker outline width."],
      ["outlineColor", "Color", "white", "Sticker outline color."],
      ...focusParameters,
    ],
  },
  {
    name: "WelkSwitch",
    previewRoute: "/switch",
    description:
      "A compact switch with a visible label and a subtly asymmetric track. The parent owns the value.",
    design: [
      "Muted track when off, accent track when on",
      "Animated thumb; tapping the track or the label toggles once",
      "onChanged: null disables the whole switch and label row",
      "Supports right-to-left layouts",
    ],
    code: `class NotificationSetting extends StatefulWidget {
  const NotificationSetting({super.key});

  @override
  State<NotificationSetting> createState() => _NotificationSettingState();
}

class _NotificationSettingState extends State<NotificationSetting> {
  bool notificationsEnabled = false;

  @override
  Widget build(BuildContext context) {
    return WelkSwitch(
      value: notificationsEnabled,
      label: 'Notifications',
      onChanged: (value) => setState(() => notificationsEnabled = value),
    );
  }
}`,
    notes: [
      "Always pass a visible label; it is also the accessible name.",
      "Exposes a single switch semantics node for TalkBack and VoiceOver.",
      "The thumb animation respects the platform's reduced-motion setting.",
    ],
    parameters: [
      ["value", "bool", "Required", "Whether the switch is on."],
      ["label", "String", "Required", "Visible label and accessible name."],
      [
        "onChanged",
        "ValueChanged<bool>?",
        "null",
        "Receives the new value. Null disables the switch and label.",
      ],
      ...focusParameters,
    ],
  },
  {
    name: "WelkTabs",
    previewRoute: "/tabs",
    description:
      "Accessible paper tabs with horizontal or vertical orientation, controlled or local selection and disabled-item skipping.",
    design: [
      "Variants: defaultStyle and withBg",
      "Controlled value or local defaultValue",
      "Arrow-key activation with Home and End navigation",
    ],
    code: `const WelkTabs(
  label: 'Workspace sections',
  defaultValue: 'overview',
  items: [
    WelkTabItem(
      label: Text('Overview'),
      value: 'overview',
      content: Text('Your mission at a glance.'),
    ),
    WelkTabItem(
      label: Text('Crew'),
      value: 'crew',
      content: Text('Meet the team.'),
    ),
  ],
)`,
    notes: [
      "WelkTabItem requires Widget label, String value and Widget content; disabled defaults to false.",
      "Keep values unique. For controlled tabs, pass value and update it from onValueChange.",
      "Horizontal arrow navigation respects text direction; disabled tabs are skipped.",
    ],
    parameters: [
      ["label", "String", "Required", "Accessible name of the tab group."],
      ["items", "List<WelkTabItem>", "Required", "Tabs and their panels."],
      ["value", "String?", "null", "Controlled selected tab value."],
      [
        "defaultValue",
        "String?",
        "null",
        "Initial local selection; falls back to the first enabled tab.",
      ],
      [
        "onValueChange",
        "ValueChanged<String>?",
        "null",
        "Receives selection changes.",
      ],
      ["variant", "WelkTabsVariant", "defaultStyle", "defaultStyle or withBg."],
      ["orientation", "Axis", "horizontal", "horizontal or vertical."],
    ],
  },
  {
    name: "WelkTimePicker",
    previewRoute: "/time-picker",
    description:
      "A controlled 24-hour time editor with scrollable time columns and optional independent seconds.",
    design: [
      "HH:mm or HH:mm:ss editing",
      "WelkTime models wall-clock time without a date or time zone",
      "Required-value and custom validation support",
    ],
    code: statefulExample(
      "TimePicker",
      "WelkTime? _time = const WelkTime(hour: 9, minute: 30);",
      `WelkTimePicker(
      label: 'Launch time',
      value: _time,
      showSeconds: true,
      onChanged: (value) => setState(() => _time = value),
    )`,
    ),
    notes: [
      "WelkTime requires hour (0-23) and minute (0-59); second defaults to 0 (0-59).",
      "Use WelkTime.fromTimeOfDay or toTimeOfDay to interoperate with Material time values.",
      "Invalid drafts remain visible but are not emitted. Clearing emits null unless isRequired.",
      "Hiding seconds preserves their value. Null onChanged disables editing and all columns.",
    ],
    parameters: [
      ["label", "String", "Required", "Visible editor label."],
      [
        "value",
        "WelkTime?",
        "Required",
        "Controlled wall-clock time, or null.",
      ],
      [
        "onChanged",
        "ValueChanged<WelkTime?>?",
        "null",
        "Receives valid time changes.",
      ],
      [
        "showSeconds",
        "bool",
        "false",
        "Displays and edits independent seconds.",
      ],
      ["isRequired", "bool", "false", "Requires a time and prevents clearing."],
      [
        "validator",
        "String? Function(WelkTime?)?",
        "null",
        "Returns an error message or null.",
      ],
      ...focusParameters,
    ],
  },
  {
    name: "WelkTooltip",
    previewRoute: "/tooltip",
    description:
      "A collision-aware comic tooltip shown on long press, pointer hover or keyboard focus.",
    design: [
      "Variants: bubble and speech",
      "speach is a compatibility alias for speech",
      "Escape and tap dismissal",
    ],
    code: `WelkTooltip(
  content: 'Save this mission for later',
  variant: WelkTooltipVariant.speech,
  child: WelkIconButton(
    icon: const Icon(Icons.bookmark),
    label: 'Save mission',
    onPressed: () {},
  ),
)`,
    notes: [
      "Use long press to try the tooltip in mobile previews.",
      "Keep essential instructions visible rather than hiding them only in a tooltip.",
      "The tooltip adds semantics but does not replace the accessible label of its interactive child.",
    ],
    parameters: [
      ["content", "String", "Required", "Tooltip message."],
      ["child", "Widget", "Required", "Trigger content."],
      [
        "variant",
        "WelkTooltipVariant",
        "bubble",
        "bubble, speech or compatibility alias speach.",
      ],
    ],
  },
] as const satisfies readonly {
  name: string;
  previewRoute: string;
  description: string;
  design: readonly string[];
  code: string;
  notes: readonly string[];
  parameters: readonly Parameter[];
}[];

export type FlutterWidgetName = (typeof flutterWidgets)[number]["name"];

export function getFlutterWidget(name: string | undefined) {
  return flutterWidgets.find((widget) => widget.name === name);
}

/**
 * Builds the preview URL with the widget route in the hash, e.g.
 * https://example.com/app/#/button. Keeps the demo navigation and theme toggle.
 */
export function getPreviewUrl(baseUrl: string, previewRoute: string) {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return null;
  }
  const local = ["localhost", "127.0.0.1"].includes(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && local))
    return null;
  url.hash = "";
  return `${url.href}#${previewRoute}`;
}
