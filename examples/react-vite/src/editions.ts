import reactLogo from "../../../assets/images/react.svg.webp";
import flutterLogo from "../../../assets/images/flutter.svg.webp";
import { catalogue } from "./catalogue";
import { flutterWidgets, getFlutterWidget } from "./flutterWidgets";
import { faqs, repository } from "./siteContent";

export const editions = {
  react: {
    label: "React Edition",
    icon: reactLogo,
    prefix: "",
    repository,
    githubRepository: "welkdock/welkUI",
    faqs,
  },
  flutter: {
    label: "Flutter Edition",
    icon: flutterLogo,
    prefix: "/flutter",
    repository: "https://github.com/welkdock/welkUI-flutter",
    githubRepository: "welkdock/welkUI-flutter",
    faqs: [
      [
        "What is WelkUI Flutter?",
        `The mobile edition of WelkUI: ${flutterWidgets.length} comic-inspired widgets for Android and iOS, including actions, forms, date and time pickers, navigation, overlays, stickers and QR codes.`,
      ],
      [
        "Which platforms does Flutter Edition target?",
        "Android and iOS mobile apps. Flutter Web and desktop are outside this edition's scope.",
      ],
      [
        "Can I install it from pub.dev?",
        "Yes. Run flutter pub add welkui_flutter, then import package:welkui_flutter/welkui_flutter.dart. It requires Dart 3.13.4+ and Flutter 3.35.0+.",
      ],
      [
        "How does theming work?",
        "Defaults work without setup. Wrap widgets in WelkTheme with a WelkThemeData to change colors, strokes and shadows. The Short Stack font is bundled, and React stylesheets are not used.",
      ],
      [
        "Where are the mobile previews?",
        "Each widget page has a live preview of the Flutter example app. It loads only when you click Run live preview. It is a web render, so native Android and iOS can differ slightly.",
      ],
      [
        "How should I test accessibility?",
        "Test your mobile app with TalkBack on Android and VoiceOver on iOS, large text, sufficient contrast, and comfortable touch targets. The widgets provide semantics, keyboard focus, RTL, text scaling and reduced-motion support; each widget page has specific notes.",
      ],
      [
        "Where can I contribute?",
        "Report issues, discuss widgets, and contribute to the welkUI-flutter repository on GitHub. Flutter contributors are listed separately from React contributors.",
      ],
    ],
  },
} as const;

export type Edition = keyof typeof editions;

export function getEdition(path: string): Edition {
  return path === "/flutter/" || path.startsWith("/flutter/")
    ? "flutter"
    : "react";
}

export function editionPath(path: string, edition: Edition): string {
  const localPath = getEdition(path) === "flutter" ? path.slice(8) : path;
  const [section, name] = localPath.split("/").filter(Boolean);
  const hasCounterpart =
    edition === "flutter"
      ? Boolean(getFlutterWidget(name))
      : catalogue.some((entry) => entry.name === name);
  const destination =
    section === "components" && name && hasCounterpart
      ? `/components/${name}/`
      : section && ["components", "faq", "contributors"].includes(section)
        ? `/${section}/`
        : "/";
  return `${editions[edition].prefix}${destination}`;
}
