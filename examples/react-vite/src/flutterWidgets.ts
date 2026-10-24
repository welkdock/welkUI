/**
 * Base URL of the deployed Flutter example app (web build), for example
 * "https://welkdock.github.io/welkUI-flutter/". Leave empty until it is
 * deployed; widget pages then show a "preview coming soon" state.
 */
export const flutterPreviewUrl = "https://welkdock.github.io/welkUI-flutter/";

export const flutterPackage = {
  name: "welkui_flutter",
  // Update this when a new version is published to pub.dev.
  version: "0.0.3",
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

export const flutterWidgets = [
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
 * Builds the iframe URL. The app reads `?embed=1` from Uri.base to hide its
 * own navigation, and opens the widget route from the hash, e.g.
 * https://example.com/app/?embed=1#/button
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
  url.searchParams.set("embed", "1");
  return `${url.href}#${previewRoute}`;
}
