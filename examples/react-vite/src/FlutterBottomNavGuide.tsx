import { Code } from "./code";

type ReferenceRow = readonly [string, string, string, string];

function ReferenceTable({
  name,
  rows,
}: {
  name: string;
  rows: readonly ReferenceRow[];
}) {
  return (
    <div
      className="propsScroll"
      role="region"
      aria-label={`${name} parameters`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Allows keyboard scrolling of the overflowing table.
      tabIndex={0}
    >
      <table className="propsTable">
        <caption>{name} reference</caption>
        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([parameter, type, defaultValue, description]) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

const itemParameters: readonly ReferenceRow[] = [
  [
    "icon",
    "Widget",
    "Required",
    "Unselected icon. IconTheme supplies color and size.",
  ],
  [
    "label",
    "String",
    "Required",
    "Visible label and default accessibility label.",
  ],
  [
    "activeIcon",
    "Widget?",
    "null",
    "Selected icon; falls back to icon. Changes cross-fade and scale.",
  ],
  [
    "builder",
    "WidgetBuilder?",
    "null",
    "Root page builder. Required for every scaffold destination; unused by the standalone bar.",
  ],
  [
    "onGenerateRoute",
    "RouteFactory?",
    "null",
    "Resolves named routes on the destination's nested navigator.",
  ],
  [
    "semanticLabel",
    "String?",
    "null",
    "Overrides the screen-reader label; otherwise uses label.",
  ],
  [
    "badge",
    "Widget?",
    "null",
    "Small widget over the icon's top-end corner, such as an unread count.",
  ],
];

const scaffoldParameters: readonly ReferenceRow[] = [
  [
    "items",
    "List<WelkBottomNavItem>",
    "Required",
    "2-5 destinations, each with a builder.",
  ],
  [
    "initialIndex",
    "int",
    "0",
    "Initial destination; clamped to the item range.",
  ],
  [
    "onIndexChanged",
    "ValueChanged<int>?",
    "null",
    "Called after the selected destination changes.",
  ],
  [
    "onReselect",
    "ValueChanged<int>?",
    "null",
    "Called when the selected destination is tapped again.",
  ],
  [
    "layout",
    "WelkBottomNavLayout",
    "popCircle",
    "Visual layout shared with the standalone bar.",
  ],
  [
    "mode",
    "WelkBottomNavMode",
    "defaultMode",
    "Anchored defaultMode or floating.",
  ],
  [
    "style",
    "WelkBottomNavStyle",
    "WelkBottomNavStyle()",
    "Shared visual configuration.",
  ],
  [
    "visibility",
    "WelkBottomNavVisibility",
    "sticky",
    "sticky, hideOnScrollDown or alwaysVisible.",
  ],
  [
    "hideOnSubpages",
    "bool",
    "true",
    "Hides the bar on pushed destination subpages, unless alwaysVisible.",
  ],
  [
    "hideWhenKeyboardVisible",
    "bool",
    "true",
    "Hides the bar while the keyboard is open, unless alwaysVisible.",
  ],
  [
    "scrollSensitivity",
    "double",
    "12",
    "Logical pixels scrolled in one direction before hiding or revealing.",
  ],
  [
    "transition",
    "WelkBottomNavTransition",
    "fade",
    "none, fade, fadeThrough, slideUp or slideHorizontal.",
  ],
  [
    "transitionDuration",
    "Duration?",
    "style.animationDuration",
    "Page switch duration (320 ms by default).",
  ],
  [
    "transitionCurve",
    "Curve",
    "Curves.easeOutCubic",
    "Page switch animation curve.",
  ],
  [
    "lazyLoad",
    "bool",
    "true",
    "Build pages on first visit; false builds all immediately.",
  ],
  [
    "keepPagesAlive",
    "bool",
    "true",
    "Preserve visited pages; false disposes them when leaving.",
  ],
  [
    "popToRootOnReselect",
    "bool",
    "true",
    "Reselecting a destination pops its nested navigator to the root.",
  ],
  [
    "extendBody",
    "bool?",
    "true floating; false default",
    "Draw pages behind the bar instead of laying them out above it.",
  ],
  [
    "backgroundColor",
    "Color?",
    "ThemeData.scaffoldBackgroundColor",
    "Surface behind destination pages.",
  ],
  [
    "semanticLabel",
    "String",
    "'Bottom navigation'",
    "Accessible name of the bar.",
  ],
  [
    "enableHapticFeedback",
    "bool",
    "true",
    "Selection-click haptic feedback on tap.",
  ],
  [
    "overRideDarkMode",
    "bool?",
    "null",
    "Force dark/light mode for the bar and pages; null inherits.",
  ],
];

const styleParameters: readonly ReferenceRow[] = [
  [
    "backgroundColor",
    "Color?",
    "theme paper",
    "Bar surface; adapts to darkPaper in dark mode.",
  ],
  [
    "selectedItemColor",
    "Color?",
    "theme accent",
    "Fill of active indicators, selected featured item and bubble.",
  ],
  [
    "selectedForegroundColor",
    "Color?",
    "readable on selected fill",
    "Selected icon and label color.",
  ],
  [
    "unselectedForegroundColor",
    "Color?",
    "theme ink at 72% opacity",
    "Inactive icon and label color.",
  ],
  [
    "featuredItemColor",
    "Color?",
    "theme muted",
    "Unselected enlarged middle item fill.",
  ],
  ["borderColor", "Color?", "theme outline", "Bar and indicator outlines."],
  [
    "borderWidth",
    "double?",
    "theme borderWidth (2)",
    "comicDock adds 1 to the theme default.",
  ],
  ["shadowColor", "Color?", "theme shadow", "Hard comic shadow color."],
  [
    "shadowOffset",
    "Offset?",
    "theme cardShadowOffset (3, 3)",
    "Hard shadow offset; comicDock defaults to (4, 4).",
  ],
  [
    "elevation",
    "double?",
    "3 floating; 0 default",
    "Soft shadow depth under the bar.",
  ],
  [
    "height",
    "double",
    "64",
    "Surface height, minimum 48; excludes safe area and pop-out items.",
  ],
  [
    "width",
    "double?",
    "null",
    "Maximum width; null fills available width. Useful on tablets.",
  ],
  [
    "margin",
    "EdgeInsetsGeometry",
    "EdgeInsets.fromLTRB(16, 0, 16, 12)",
    "Outer spacing in floating mode; ignored in defaultMode.",
  ],
  [
    "padding",
    "EdgeInsetsGeometry",
    "EdgeInsets.symmetric(horizontal: 6)",
    "Inner spacing around items.",
  ],
  [
    "borderRadius",
    "double?",
    "layout default",
    "Uniform radius; null preserves asymmetric corners or bubbleRail's pill. Anchored mode rounds only top corners.",
  ],
  [
    "iconSize",
    "double",
    "24",
    "Regular icon size; must be positive. Featured icons are 1.3x larger.",
  ],
  [
    "activeItemSize",
    "double",
    "60",
    "Featured middle item's diameter/side, minimum 40; controls pop-out height.",
  ],
  ["labelStyle", "TextStyle?", "Short Stack, 12 px", "Merged into all labels."],
  [
    "selectedLabelStyle",
    "TextStyle?",
    "bold",
    "Merged over labelStyle for the selected label.",
  ],
  [
    "labelBehavior",
    "WelkBottomNavLabelBehavior",
    "alwaysShow",
    "alwaysShow, selectedOnly (animated) or hidden.",
  ],
  [
    "animationDuration",
    "Duration",
    "Duration(milliseconds: 320)",
    "Indicator, icon, color, visibility and default page transition duration.",
  ],
  [
    "animationCurve",
    "Curve",
    "Curves.easeOutBack",
    "Pop, scaling and bubble glide curve.",
  ],
];

export function FlutterBottomNavInstall() {
  return (
    <>
      <h3>Availability and installation</h3>
      <p>
        Bottom navigation is introduced in the <strong>0.1.9 API</strong>. Add
        the dependency below to your app&apos;s pubspec.yaml, then run{" "}
        <code>flutter pub get</code>.
      </p>
      <Code language="YAML" theme="dracula">{`dependencies:
  flutter:
    sdk: flutter
  welkui_flutter: ^0.2.0`}</Code>
      <p>No React package or stylesheet is needed.</p>
    </>
  );
}

export function FlutterBottomNavGuide() {
  return (
    <>
      <h3>Choose the bar or the app scaffold</h3>
      <p>
        Use <code>WelkBottomNavBar</code> when you already manage pages, routing
        and selection. Its <code>onTap</code> callback includes taps on the
        selected item; update <code>currentIndex</code> yourself.
      </p>
      <p>
        <strong>Recommended for a complete app shell:</strong>{" "}
        <code>WelkBottomNavScaffold</code> owns one nested navigator per
        destination, preserves page state and manages transitions and
        visibility. Both widgets share items, layouts, modes and styles. Do not
        wrap the scaffold in another <code>Scaffold</code>; each destination can
        have its own scaffold and app bar.
      </p>
      <Code language="Dart" theme="dracula">{`WelkTheme(
  data: const WelkThemeData(),
  child: MaterialApp(
    home: WelkBottomNavScaffold(
      items: [
        WelkBottomNavItem(
          icon: const Icon(Icons.home_outlined),
          activeIcon: const Icon(Icons.home),
          label: 'Home',
          builder: (_) => const Scaffold(
            body: Center(child: Text('Home')),
          ),
        ),
        WelkBottomNavItem(
          icon: const Icon(Icons.add),
          label: 'Create',
          builder: (_) => const Scaffold(
            body: Center(child: Text('Create')),
          ),
        ),
        WelkBottomNavItem(
          icon: const Icon(Icons.person_outline),
          label: 'Profile',
          builder: (_) => const Scaffold(
            body: Center(child: Text('Profile')),
          ),
        ),
      ],
    ),
  ),
)`}</Code>

      <h3>Five layouts</h3>
      <ul className="variantList">
        <li>
          <code>popCircle</code> (default): an enlarged middle circle pops above
          the bar with a hard shadow; selection lifts it and applies the
          selected fill.
        </li>
        <li>
          <code>blockCenter</code>: a larger square built into the bar,
          separated by ink outlines. Keeps a flat silhouette without overlapping
          page content.
        </li>
        <li>
          <code>popBlock</code>: an asymmetric square protrudes above the bar
          and tilts and lifts on selection, like a peeled sticker.
        </li>
        <li>
          <code>comicDock</code>: bold outlines, hand-drawn corners and a
          raised, tilted active tile with action lines. All destinations are
          equal size; best in floating mode.
        </li>
        <li>
          <code>bubbleRail</code>: a pill with a gliding active bubble and two
          decorative bouncing bubbles. No featured middle destination.
        </li>
      </ul>
      <p>
        Set <code>layout: WelkBottomNavLayout.popBlock</code> on either widget.
        The first three layouts feature the second item with 3 destinations or
        the third with 5. With 2 or 4 items, none is enlarged. The featured item
        remains enlarged even when another destination is selected.
      </p>

      <h3>Anchored and floating modes</h3>
      <p>
        <code>WelkBottomNavMode.defaultMode</code> anchors to the bottom,
        extends its surface into the home-indicator safe area, rounds only the
        top corners and draws a top outline. It has no elevation by default.
        <code> WelkBottomNavMode.floating</code> adds outer margins plus the
        bottom safe area, rounds all corners and draws a full outline, a hard
        comic shadow and a soft elevation shadow.
      </p>
      <Code
        language="Dart"
        theme="dracula"
      >{`// Reuse the items from the scaffold example.
WelkBottomNavScaffold(
  items: items,
  layout: WelkBottomNavLayout.comicDock,
  mode: WelkBottomNavMode.floating,
  style: const WelkBottomNavStyle(
    margin: EdgeInsets.fromLTRB(24, 0, 24, 16),
    borderRadius: 24,
    elevation: 6,
    width: 480,
  ),
)`}</Code>

      <h3>Pages, state and nested navigation</h3>
      <p>
        Every scaffold item needs a <code>builder</code>. By default, pages are
        built on their first visit (<code>lazyLoad: true</code>) and retained
        offstage (<code>keepPagesAlive: true</code>), preserving scroll
        positions, fields and counters. Inactive pages have tickers paused and
        are excluded from focus traversal. Set <code>lazyLoad: false</code> to
        build all pages immediately, or <code>keepPagesAlive: false</code> to
        dispose pages on leaving and lose their local state.
      </p>
      <p>
        Each destination keeps its own back stack. Push from a context inside
        the destination to open a subpage; switching tabs preserves it. System
        back pops the active destination&apos;s subpage first. Hero animations
        work within a destination. To cover the whole app, including the bar,
        push onto the root navigator.
      </p>
      <Code
        language="Dart"
        theme="dracula"
      >{`// From a destination page's BuildContext:
Navigator.of(context).push(
  MaterialPageRoute<void>(
    builder: (_) => const Scaffold(
      body: Center(child: Text('Details')),
    ),
  ),
);

// Full-screen flow above the navigation shell:
Navigator.of(context, rootNavigator: true).push(
  MaterialPageRoute<void>(
    fullscreenDialog: true,
    builder: (_) => const Scaffold(
      body: Center(child: Text('Sign in')),
    ),
  ),
);`}</Code>
      <h4>Named routes</h4>
      <p>
        Set <code>onGenerateRoute</code> on an item to resolve named routes for
        that destination. Push using a context inside its page:
      </p>
      <Code language="Dart" theme="dracula">{`WelkBottomNavItem(
  icon: const Icon(Icons.home),
  label: 'Home',
  builder: (_) => const HomePage(),
  onGenerateRoute: (settings) => switch (settings.name) {
    '/details' => MaterialPageRoute<void>(
      settings: settings,
      builder: (_) => const DetailsPage(),
    ),
    _ => null,
  },
)

// HomePage and DetailsPage are your app's page widgets.
// Inside HomePage:
Navigator.of(context).pushNamed('/details');`}</Code>
      <h4>Selection and programmatic control</h4>
      <p>
        <code>initialIndex</code> selects the first page (default 0, clamped to
        range). <code>onIndexChanged</code> reports selection changes and{" "}
        <code>onReselect</code> reports repeat taps, useful for scrolling to the
        top. By default, reselecting also pops that destination to its root;
        disable with <code>popToRootOnReselect: false</code>.
      </p>
      <Code
        language="Dart"
        theme="dracula"
      >{`final nav = WelkBottomNavScaffold.of(context);
nav.select(0);       // Includes the normal tap/reselect behavior.
nav.popToRoot();     // Current destination.
nav.popToRoot(2);    // A specific destination.
final index = nav.currentIndex;
final visible = nav.isBarVisible;
final navigator = nav.navigatorOf(1); // Null until built.

// Nullable lookup when the context may be outside the shell:
final optionalNav = WelkBottomNavScaffold.maybeOf(context);`}</Code>
      <p>
        For control from outside its subtree, retain a{" "}
        <code>GlobalKey&lt;WelkBottomNavScaffoldState&gt;</code> in your state,
        pass it as the scaffold&apos;s <code>key</code>, then call{" "}
        <code>navKey.currentState?.select(2)</code>.
      </p>

      <h3>Page transitions</h3>
      <ul className="variantList">
        <li>
          <code>none</code>: instant switch.
        </li>
        <li>
          <code>fade</code> (default): fade in.
        </li>
        <li>
          <code>fadeThrough</code>: fade in while scaling from 94%.
        </li>
        <li>
          <code>slideUp</code>: fade in while rising slightly.
        </li>
        <li>
          <code>slideHorizontal</code>: fade and slide from the direction of
          travel, mirrored for RTL.
        </li>
      </ul>
      <p>
        Set <code>transition: WelkBottomNavTransition.slideHorizontal</code>.
        <code> transitionDuration</code> defaults to{" "}
        <code>style.animationDuration</code> (320 ms) and{" "}
        <code>transitionCurve</code> to <code>Curves.easeOutCubic</code>.
      </p>

      <h3>Visibility and scroll behavior</h3>
      <ul className="variantList">
        <li>
          <code>sticky</code> (default): stays visible while scrolling, but
          still honors subpage and keyboard hiding.
        </li>
        <li>
          <code>hideOnScrollDown</code>: hides on downward scrolling and reveals
          on upward scrolling after <code>scrollSensitivity</code> logical
          pixels (default 12). Horizontal scroll, overscroll and bounces are
          ignored. Reaching the top, changing destinations or navigating to/from
          a subpage resets scroll hiding.
        </li>
        <li>
          <code>alwaysVisible</code>: never hides; overrides both{" "}
          <code>hideOnSubpages</code> and <code>hideWhenKeyboardVisible</code>.
        </li>
      </ul>
      <p>
        Both <code>hideOnSubpages</code> and{" "}
        <code>hideWhenKeyboardVisible</code> default to true. Opening a nested
        Details page hides the bar; returning to the root reveals it with the
        same destination selected. Set <code>hideOnSubpages: false</code> to
        keep it available on subpages. Hidden bars are removed from hit-testing
        and accessibility semantics.
      </p>
      <Code
        language="Dart"
        theme="dracula"
      >{`// Floating dock that hides while reading:
WelkBottomNavScaffold(
  items: items,
  layout: WelkBottomNavLayout.comicDock,
  mode: WelkBottomNavMode.floating,
  visibility: WelkBottomNavVisibility.hideOnScrollDown,
  scrollSensitivity: 24,
  transition: WelkBottomNavTransition.fadeThrough,
)`}</Code>

      <h3>Safe areas and content insets</h3>
      <p>
        The scaffold lays pages above the bar in anchored mode (
        <code>extendBody: false</code>) and behind it in floating mode (
        <code>extendBody: true</code>). Override explicitly if needed. While
        visible, the bar&apos;s occupied space is exposed through{" "}
        <code>MediaQuery.padding.bottom</code> so standard <code>SafeArea</code>
        ,<code> Scaffold</code> and default <code>ListView</code> padding keep
        content reachable. The inset animates away as the bar hides.
      </p>
      <p>If you override list padding, include the inset yourself:</p>
      <Code language="Dart" theme="dracula">{`ListView(
  padding: EdgeInsets.fromLTRB(
    16, 16, 16,
    16 + MediaQuery.paddingOf(context).bottom,
  ),
  children: const [
    ListTile(title: Text('Your content')),
  ],
)`}</Code>
      <p>
        For standalone integration,{" "}
        <code>WelkBottomNavBar.layoutExtent(context, itemCount: 3)</code>{" "}
        returns reserved bottom height, excluding pop-out items. Pass the same{" "}
        <code>layout</code>, <code>mode</code> and <code>style</code> as the bar
        when computing your content padding. Do not add a second safe-area
        wrapper around the bar.
      </p>

      <h3>Items and badges</h3>
      <ReferenceTable name="WelkBottomNavItem" rows={itemParameters} />
      <p>
        Plain <code>Icon</code> widgets inherit the correct color and size;
        explicit icon colors bypass this. Use a short badge and give the
        destination a meaningful accessibility label:
      </p>
      <Code language="Dart" theme="dracula">{`WelkBottomNavItem(
  icon: const Icon(Icons.mail_outline),
  activeIcon: const Icon(Icons.mail),
  label: 'Inbox',
  semanticLabel: 'Inbox, 3 unread messages',
  badge: Container(
    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
    decoration: BoxDecoration(
      color: const Color(0xFFFF8A80),
      borderRadius: BorderRadius.circular(10),
      border: Border.all(width: 1.5),
    ),
    child: const Text('3', style: TextStyle(fontSize: 10)),
  ),
  builder: (_) => const Scaffold(
    body: Center(child: Text('Inbox')),
  ),
)`}</Code>

      <h3>Styling and label behavior</h3>
      <p>
        All colors are optional and resolve from <code>WelkTheme</code>. In dark
        mode, the bar uses <code>darkPaper</code>, <code>darkOutline</code> and{" "}
        <code>darkShadow</code>, with selected fills tinted by{" "}
        <code>darkButtonTint</code> and readable foregrounds. Explicit style
        colors are used unchanged in both modes. Set{" "}
        <code>overRideDarkMode</code> on the scaffold to affect both bar and
        pages.
      </p>
      <Code
        language="Dart"
        theme="dracula"
      >{`const baseStyle = WelkBottomNavStyle(
  selectedItemColor: Color(0xFF82CAFF),
  featuredItemColor: Color(0xFF8DDD9B),
  height: 60,
  activeItemSize: 56,
  borderRadius: 20,
  labelBehavior: WelkBottomNavLabelBehavior.selectedOnly,
  animationDuration: Duration(milliseconds: 250),
);

final warmerStyle = baseStyle.copyWith(
  selectedItemColor: const Color(0xFFFFB366),
);`}</Code>
      <p>
        For an icon-only rail, choose{" "}
        <code>WelkBottomNavLayout.bubbleRail</code>, floating mode and{" "}
        <code>WelkBottomNavLabelBehavior.hidden</code>. Labels remain available
        to assistive technology. <code>alwaysShow</code> is the default;
        <code> selectedOnly</code> animates labels in on selection.
      </p>
      <ReferenceTable name="WelkBottomNavStyle" rows={styleParameters} />

      <h3>WelkBottomNavScaffold constructor parameters</h3>
      <ReferenceTable name="WelkBottomNavScaffold" rows={scaffoldParameters} />
      <h4>WelkBottomNavScaffoldState API</h4>
      <ReferenceTable
        name="WelkBottomNavScaffoldState"
        rows={[
          ["currentIndex", "int", "Read only", "Selected destination."],
          [
            "isBarVisible",
            "bool",
            "Read only",
            "Whether the bar is shown or animating in.",
          ],
          [
            "select(int index)",
            "void",
            "-",
            "Select a destination, including normal reselect behavior.",
          ],
          [
            "popToRoot([int? index])",
            "void",
            "Current destination",
            "Pop a destination's nested navigator to its root.",
          ],
          [
            "navigatorOf(int index)",
            "NavigatorState?",
            "null until built",
            "Access a destination's nested navigator.",
          ],
        ]}
      />

      <h3>Try the complete demo</h3>
      <p>
        Run the live preview on this page or{" "}
        <a
          href="https://welkdock.github.io/welkUI-flutter/#/bottom-nav"
          target="_blank"
          rel="noreferrer"
        >
          open the bottom navigation example
        </a>
        . Compare every layout in anchored and floating modes, then choose a
        layout, visibility, transition and label behavior and tap{" "}
        <strong>Launch demo app</strong>. The full five-destination demo
        includes preserved state, nested subpages, badges, scroll hiding and
        theme switching. Native keyboard behavior and haptics should be tested
        on Android and iOS.
      </p>
    </>
  );
}
