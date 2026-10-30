import { useId, useRef, useEffect, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import {
  WelkAccordion,
  WelkAttachment,
  WelkAvatar,
  WelkBadge,
  WelkBreadCrumbs,
  WelkButton,
  WelkCard,
  WelkCheckBox,
  WelkDateInput,
  WelkDatePicker,
  WelkDialog,
  WelkDivider,
  WelkDrawer,
  WelkDropDown,
  WelkIconButton,
  WelkImage,
  WelkInput,
  WelkMenu,
  WelkOTPInput,
  WelkQRCode,
  WelkRadio,
  WelkRadioGroup,
  WelkRangeSlider,
  WelkSnackBar,
  WelkSticker,
  WelkStickerCard,
  WelkSwitch,
  WelkTabs,
  WelkTimePicker,
  WelkTooltip,
} from "@welkui/react";
import type { ComponentName } from "./catalogue";
import superman from "../../../assets/images/superman.png";
import comic from "../../../assets/images/comic_bg_04.jpg";

interface Example {
  title: string;
  description: string;
  configuration: string;
  preview: ReactNode;
}

const sizes = ["sm", "md", "lg"] as const;
const colors = ["default", "info", "success", "warning", "error"] as const;
const buttonColors = [
  "primary",
  "secondary",
  "ghost",
  "info",
  "success",
  "warning",
  "error",
] as const;
const positions = [
  "top-left",
  "top-middle",
  "top-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
] as const;
const options = [
  { label: "Hero", value: "hero" },
  { label: "Sidekick", value: "sidekick" },
  { label: "Villain (unavailable)", value: "villain", disabled: true },
];
const imageStyle = { maxWidth: "100%", height: "auto" } as const;
const brokenImage = "data:image/png;base64,invalid-image";

function NetworkImageExample() {
  const [url, setUrl] = useState(
    "https://img.magnific.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg",
  );
  const source = url.trim();
  return (
    <div className="stack">
      <WelkInput
        label="Image URL"
        type="url"
        value={url}
        onChange={(event) => setUrl(event.currentTarget.value)}
        placeholder="https://example.com/image.jpg"
      />
      {source ? (
        <WelkImage
          variant="network"
          src={source}
          alt="Network image preview"
          width={320}
          height={180}
          style={imageStyle}
        />
      ) : (
        <p className="finePrint" role="status">
          Enter an image URL to preview it.
        </p>
      )}
    </div>
  );
}

function ActionCard({
  sticker = false,
  growOnHover = true,
  disabled = false,
  icon = false,
}: {
  sticker?: boolean;
  growOnHover?: boolean;
  disabled?: boolean;
  icon?: boolean;
}) {
  const [accepted, setAccepted] = useState(false);
  const props = {
    title: "Your next mission",
    subtitle: "Activate this card to accept.",
    onClick: () => setAccepted(true),
    growOnHover,
    disabled,
    icon: icon ? <span aria-hidden="true">+</span> : undefined,
  };
  return (
    <div className={sticker ? "stickerCardExample" : undefined}>
      {sticker ? (
        <WelkStickerCard {...props} sticker={{ src: superman, alt: "" }} />
      ) : (
        <WelkCard {...props} />
      )}
      <p className="finePrint" role="status">
        {accepted ? "Mission accepted!" : "Waiting for your next adventure."}
      </p>
    </div>
  );
}

function DialogExample({
  variant = "alert",
  type = "default",
}: {
  variant?: ComponentProps<typeof WelkDialog>["variant"];
  type?: ComponentProps<typeof WelkDialog>["type"];
}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  return (
    <>
      <WelkButton onClick={() => setOpen(true)}>
        Try {type === "confirmation" ? type : variant} dialog
      </WelkButton>
      <WelkDialog
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
        type={type}
        title={
          type === "confirmation"
            ? "Accept this mission?"
            : `${variant} message`
        }
        closeOnTapOutside
        onYesPress={() => {
          setResult("Mission accepted.");
          setOpen(false);
        }}
        onNoPress={() => {
          setResult("Mission declined.");
          setOpen(false);
        }}
      >
        This is a real modal. Try Tab, Escape, the close button, or the
        backdrop.
      </WelkDialog>
      <p className="finePrint" role="status">
        {result}
      </p>
    </>
  );
}

function DrawerExample({
  position,
}: {
  position: NonNullable<ComponentProps<typeof WelkDrawer>["position"]>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WelkButton onClick={() => setOpen(true)}>
        Try {position} drawer
      </WelkButton>
      <WelkDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${position} drawer`}
        position={position}
        closeOnTapOutside
      >
        <p>
          This panel enters from the {position} edge. Focus stays inside until
          you close it.
        </p>
        <WelkButton onClick={() => setOpen(false)}>Done</WelkButton>
      </WelkDrawer>
    </>
  );
}

function SnackExample({
  label,
  variant = "default",
  position = "bottom-middle",
  timed = false,
}: {
  label: string;
  variant?: ComponentProps<typeof WelkSnackBar>["variant"];
  position?: ComponentProps<typeof WelkSnackBar>["position"];
  timed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [sequence, setSequence] = useState(0);
  return (
    <>
      <WelkButton
        onClick={() => {
          setSequence((value) => value + 1);
          setOpen(true);
        }}
      >
        Try {label} notification
      </WelkButton>
      <WelkSnackBar
        key={sequence}
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
        position={position}
        autoHideDuration={timed ? 4000 : 0}
        message={
          timed
            ? "Disappears after 4 seconds. Hover or focus to pause."
            : `${variant}: your comic notification!`
        }
      />
    </>
  );
}

function InputActionExample() {
  const [visible, setVisible] = useState(false);
  return (
    <WelkInput
      label="Secret identity"
      type={visible ? "text" : "password"}
      defaultValue="Captain Welk"
      endAction={{
        icon: <span aria-hidden="true">{visible ? "-" : "+"}</span>,
        label: visible ? "Hide password" : "Show password",
        onClick: () => setVisible(!visible),
      }}
    />
  );
}

function IconExample({
  variant,
  disabled = false,
}: {
  variant: "default" | "text";
  disabled?: boolean;
}) {
  const [count, setCount] = useState(0);
  return (
    <>
      <WelkIconButton
        icon={<span>+</span>}
        label="Add a panel"
        variant={variant}
        disabled={disabled}
        onClick={() => setCount(count + 1)}
      />
      <p role="status" className="finePrint">
        {count} panels added
      </p>
    </>
  );
}

function IndeterminateExample() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = true;
  }, []);
  return <WelkCheckBox ref={ref} label="Partially selected" />;
}

function ControlledExample({
  kind,
}: {
  kind: "switch" | "range" | "otp" | "radio";
}) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [power, setPower] = useState(50);
  return (
    <div className="stack">
      {kind === "switch" && (
        <WelkSwitch
          label="Live setting"
          checked={checked}
          onCheckedChange={setChecked}
        />
      )}
      {kind === "range" && (
        <WelkRangeSlider
          label="Live power"
          value={power}
          onValueChange={setPower}
        />
      )}
      {kind === "otp" && (
        <WelkOTPInput
          label="Live verification"
          value={value}
          onValueChange={setValue}
        />
      )}
      {kind === "radio" && (
        <WelkRadioGroup
          label="Live role"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      )}
      <output className="finePrint" aria-live="polite">
        {kind === "switch"
          ? `Current value: ${checked ? "on" : "off"}`
          : kind === "range"
            ? `Current value: ${power}`
            : `Current value: ${value || "(empty)"}`}
      </output>
    </div>
  );
}

function RadioExample() {
  const name = useId();
  return (
    <fieldset className="radioExampleGroup stack">
      <legend>Choose one option</legend>
      <WelkRadio
        name={name}
        label="First option"
        value="first"
        defaultChecked
      />
      <WelkRadio name={name} label="Second option" value="second" />
      <WelkRadio
        name={name}
        label="Unavailable option"
        value="third"
        disabled
      />
    </fieldset>
  );
}

function MenuExample({
  nested = false,
  collapsible = false,
}: {
  nested?: boolean;
  collapsible?: boolean;
}) {
  const [active, setActive] = useState("/guide");
  return (
    <>
      <WelkMenu
        aria-label="Example navigation"
        variant={nested ? "nested" : "default"}
        collapsible={collapsible}
        activeRoute={active}
        onClick={(event) => {
          const anchor =
            event.target instanceof Element ? event.target.closest("a") : null;
          if (anchor) {
            event.preventDefault();
            setActive(anchor.getAttribute("href") ?? "");
          }
        }}
        items={[
          { title: "Overview", route: "/guide" },
          {
            title: "Components",
            route: "/guide/components",
            children: [
              { title: "Buttons", route: "/guide/components/buttons" },
              {
                title: "Forms",
                route: "/guide/components/forms",
                children: [
                  { title: "Inputs", route: "/guide/components/forms/inputs" },
                ],
              },
            ],
          },
        ]}
      />
      <p className="finePrint" role="status">
        Selected route: {active}. These example links stay on this page.
      </p>
    </>
  );
}

function examplesFor(name: ComponentName): Example[] {
  switch (name) {
    case "WelkButton":
      return [
        ...buttonColors.map((variant) => ({
          title: variant,
          description: `The ${variant} color treatment. Hover, focus, and press to compare the feedback.`,
          configuration: `variant="${variant}"`,
          preview: <WelkButton variant={variant}>{variant}</WelkButton>,
        })),
        ...sizes.map((size) => ({
          title: `Size ${size}`,
          description: "Compare the same action at a different size.",
          configuration: `size="${size}"`,
          preview: <WelkButton size={size}>Take action</WelkButton>,
        })),
        {
          title: "Disabled",
          description: "Unavailable actions cannot be activated.",
          configuration: "disabled",
          preview: <WelkButton disabled>Not available</WelkButton>,
        },
      ];
    case "WelkBadge":
      return [
        ...colors.map((variant) => ({
          title: variant,
          description: `A non-interactive ${variant} status label.`,
          configuration: `variant="${variant}"`,
          preview: <WelkBadge variant={variant}>{variant}</WelkBadge>,
        })),
        ...sizes.map((size) => ({
          title: `Size ${size}`,
          description: "Badge size changes padding and typography.",
          configuration: `size="${size}"`,
          preview: <WelkBadge size={size}>New chapter</WelkBadge>,
        })),
      ];
    case "WelkAvatar":
      return [
        ...(
          [
            "user",
            "male-user",
            "female-user",
            "male-admin",
            "female-admin",
          ] as const
        ).map((variant) => ({
          title: variant,
          description: "Bundled portrait; no remote image request is needed.",
          configuration: `variant="${variant}"`,
          preview: <WelkAvatar variant={variant} alt={`${variant} portrait`} />,
        })),
        ...sizes.map((size) => ({
          title: `Size ${size}`,
          description:
            "Choose a size appropriate to lists, headers, or profile summaries.",
          configuration: `size="${size}"`,
          preview: <WelkAvatar size={size} alt={`${size} avatar`} />,
        })),
        {
          title: "Custom image",
          description: "A src overrides bundled artwork. Hover to enlarge.",
          configuration: "src={superman} growOnHover",
          preview: (
            <WelkAvatar src={superman} alt="Superman profile" growOnHover />
          ),
        },
        {
          title: "Custom icon and background",
          description: "An icon can replace the portrait when src is omitted.",
          configuration: 'icon={<span>W</span>} color="#82caff"',
          preview: (
            <WelkAvatar icon={<span>W</span>} alt="Welk team" color="#82caff" />
          ),
        },
      ];
    case "WelkAccordion":
      return [
        {
          title: "Vertical",
          description:
            "Default downward disclosure. Starts open here so the layout is visible; click the title to toggle.",
          configuration: 'variant="vertical" open',
          preview: (
            <WelkAccordion title="Vertical details" open>
              Content appears below the summary.
            </WelkAccordion>
          ),
        },
        {
          title: "Horizontal",
          description: "Reveals content beside its title rather than below.",
          configuration: 'variant="horizontal" open',
          preview: (
            <WelkAccordion title="Sideways details" variant="horizontal" open>
              Content appears alongside the summary.
            </WelkAccordion>
          ),
        },
        {
          title: "Nested",
          description:
            "Place a nested disclosure inside a parent to build a content hierarchy.",
          configuration: 'variant="nested"',
          preview: (
            <WelkAccordion title="Parent chapter" open>
              <WelkAccordion title="Nested chapter" variant="nested" open>
                One level deeper.
              </WelkAccordion>
            </WelkAccordion>
          ),
        },
        {
          title: "Outside dismissal",
          description:
            "Expand the summary, then click elsewhere on the page to close it.",
          configuration: "closeOnOutsideClick fixedWidth={320}",
          preview: (
            <WelkAccordion
              title="Click outside to close"
              closeOnOutsideClick
              fixedWidth={320}
            >
              Use for temporary supplemental content.
            </WelkAccordion>
          ),
        },
      ];
    case "WelkAttachment":
      return [
        {
          title: "Multiple files",
          description:
            "Choose a batch; local images, video, and audio receive previews. No files are uploaded.",
          configuration: "multiple",
          preview: <WelkAttachment label="Choose mission files" />,
        },
        {
          title: "Single image",
          description:
            "Only one image is allowed. Selecting a new image replaces the previous selection.",
          configuration: 'multiple={false} accept="image/*"',
          preview: (
            <WelkAttachment
              label="Choose a cover image"
              multiple={false}
              accept="image/*"
            />
          ),
        },
        {
          title: "Count, size and type limits",
          description:
            "At most two images/PDFs, each up to 1 MiB. An invalid batch is cleared and an error explains why.",
          configuration:
            'maxFiles={2} maxFileSize={1048576} accept="image/*,.pdf"',
          preview: (
            <WelkAttachment
              label="Choose up to two small files"
              maxFiles={2}
              maxFileSize={1048576}
              accept="image/*,.pdf"
            />
          ),
        },
        {
          title: "Disabled",
          description: "The native file picker cannot be opened.",
          configuration: "disabled",
          preview: <WelkAttachment label="Attachments unavailable" disabled />,
        },
      ];
    case "WelkBreadCrumbs": {
      const items = [
        { label: "Guide", href: "/components/" },
        { label: "Navigation", href: "/components/WelkMenu/" },
        { label: "Current page" },
      ];
      return [
        {
          title: "Default separator",
          description:
            "Native links, slash separators, and a final current-page item.",
          configuration: "items={[{ label, href }, ...]}",
          preview: <WelkBreadCrumbs items={items} />,
        },
        {
          title: "Custom separator",
          description:
            "Replace the slash with a decorative text or icon separator.",
          configuration: 'separator=">"',
          preview: <WelkBreadCrumbs items={items} separator=">" />,
        },
        {
          title: "Text-only trail",
          description: "Omit href when an ancestor should not be navigable.",
          configuration: "items={[{ label: 'Guide' }, { label: 'Here' }]}",
          preview: (
            <WelkBreadCrumbs items={[{ label: "Guide" }, { label: "Here" }]} />
          ),
        },
      ];
    }
    case "WelkCard":
    case "WelkStickerCard": {
      const sticker = name === "WelkStickerCard";
      return [
        {
          title: "Hover growth",
          description: sticker
            ? "Move over the artwork or card: both scale together."
            : "Hover to enlarge the card, then activate it to update its status.",
          configuration: "growOnHover={true}",
          preview: <ActionCard sticker={sticker} />,
        },
        {
          title: "No growth",
          description:
            "The card still acts as a native button but does not enlarge.",
          configuration: "growOnHover={false}",
          preview: <ActionCard sticker={sticker} growOnHover={false} />,
        },
        {
          title: "With icon",
          description:
            "Optional icon content accompanies the title and subtitle.",
          configuration: "icon={<span>+</span>}",
          preview: <ActionCard sticker={sticker} icon />,
        },
        {
          title: "Disabled",
          description: "Neither interaction nor hover growth is available.",
          configuration: "disabled",
          preview: <ActionCard sticker={sticker} disabled />,
        },
      ];
    }
    case "WelkCheckBox":
      return [
        {
          title: "Unchecked",
          description: "Click the label or use Space to select.",
          configuration: "defaultChecked={false}",
          preview: <WelkCheckBox label="Optional extra" />,
        },
        {
          title: "Checked",
          description:
            "An uncontrolled checkbox starts selected and remains editable.",
          configuration: "defaultChecked",
          preview: <WelkCheckBox label="Include bonus panel" defaultChecked />,
        },
        {
          title: "Indeterminate",
          description:
            "A partial selection is set through the native input ref, not a JSX prop. Clicking resolves it.",
          configuration: "ref.current.indeterminate = true",
          preview: <IndeterminateExample />,
        },
        {
          title: "Disabled states",
          description:
            "Disabled checkboxes retain their checked appearance but cannot change.",
          configuration: "disabled / disabled defaultChecked",
          preview: (
            <div className="stack">
              <WelkCheckBox label="Disabled unchecked" disabled />
              <WelkCheckBox label="Disabled checked" disabled defaultChecked />
            </div>
          ),
        },
      ];
    case "WelkDateInput":
    case "WelkDatePicker": {
      const Picker = name === "WelkDateInput" ? WelkDateInput : WelkDatePicker;
      return [
        {
          title: "Empty",
          description:
            "Type YYYY-MM-DD or choose a day using the custom calendar.",
          configuration: 'defaultValue=""',
          preview: <Picker label="Choose a date" />,
        },
        {
          title: "Preselected",
          description:
            "Starts on a known date; selecting a day updates the field.",
          configuration: 'defaultValue="2026-10-23"',
          preview: <Picker label="Selected launch" defaultValue="2026-10-23" />,
        },
        {
          title: "Circular marking",
          description:
            "One of six uneven red pen circles marks the selection. Today is not highlighted by default.",
          configuration: 'circularMarking defaultValue="2026-10-23"',
          preview: (
            <Picker
              label="Circle your date"
              defaultValue="2026-10-23"
              circularMarking
            />
          ),
        },
        {
          title: "Custom marking color",
          description: "Pass any CSS color to customize the pen circle.",
          configuration:
            'circularMarking circularMarkingColor="#2563eb" defaultValue="2026-10-23"',
          preview: (
            <Picker
              label="Blue pen date"
              defaultValue="2026-10-23"
              circularMarking
              circularMarkingColor="#2563eb"
            />
          ),
        },
        {
          title: "Today's date",
          description:
            "Opt in to a yellow, borderless box on today. Works with or without circular marking.",
          configuration: "showTodaysDate circularMarking",
          preview: (
            <Picker label="Today highlighted" showTodaysDate circularMarking />
          ),
        },
        {
          title: "Bounded range",
          description:
            "Only October 20-28, 2026 can be selected. Navigate the calendar to inspect disabled days.",
          configuration: 'min="2026-10-20" max="2026-10-28"',
          preview: (
            <Picker
              label="Launch window"
              defaultValue="2026-10-23"
              min="2026-10-20"
              max="2026-10-28"
            />
          ),
        },
        {
          title: "Disabled",
          description: "A visible value with selection and editing disabled.",
          configuration: 'disabled defaultValue="2026-10-23"',
          preview: (
            <Picker
              label="Locked launch date"
              defaultValue="2026-10-23"
              disabled
            />
          ),
        },
      ];
    }
    case "WelkDialog":
      return [
        ...(["alert", "info", "warning", "error", "success"] as const).map(
          (variant) => ({
            title: variant,
            description: `Open a ${variant} modal to inspect its surface, action color, and focus behavior.`,
            configuration: `variant="${variant}" type="default"`,
            preview: <DialogExample variant={variant} />,
          }),
        ),
        {
          title: "Confirmation",
          description:
            "Two actions with independent callbacks. The result is displayed after the modal closes.",
          configuration: 'type="confirmation" onYesPress={...} onNoPress={...}',
          preview: <DialogExample type="confirmation" />,
        },
      ];
    case "WelkDivider":
      return [
        ...(["plain", "dotted", "dashed"] as const).map((variant) => ({
          title: variant,
          description: `Horizontal ${variant} separator at the default thickness.`,
          configuration: `variant="${variant}"`,
          preview: <WelkDivider variant={variant} />,
        })),
        {
          title: "Vertical",
          description: "Use explicit height to separate adjacent content.",
          configuration: 'orientation="vertical" style={{ height: 64 }}',
          preview: (
            <div className="row">
              Before
              <WelkDivider orientation="vertical" style={{ height: 64 }} />
              After
            </div>
          ),
        },
        {
          title: "Thick line",
          description:
            "Increase the positive pixel thickness for a stronger visual break.",
          configuration: "thickness={5}",
          preview: <WelkDivider thickness={5} />,
        },
      ];
    case "WelkDrawer":
      return (["left", "right", "top", "bottom"] as const).map((position) => ({
        title: position,
        description: `Open the ${position}-edge drawer. Escape, the backdrop, and Done all dismiss this example.`,
        configuration: `position="${position}" closeOnTapOutside`,
        preview: <DrawerExample position={position} />,
      }));
    case "WelkDropDown":
      return [
        {
          title: "Native select",
          description:
            "Default native selection; the unavailable option cannot be chosen.",
          configuration: "searchable={false}",
          preview: (
            <WelkDropDown label="Native hero choice" options={options} />
          ),
        },
        {
          title: "Searchable",
          description:
            "Type to filter, then use arrows and Enter or select an option. Typing alone does not select.",
          configuration: "searchable",
          preview: (
            <WelkDropDown
              label="Search for a role"
              options={options}
              searchable
            />
          ),
        },
        {
          title: "Preselected",
          description:
            "An initial uncontrolled value matches an option's value, not its label.",
          configuration: 'defaultValue="hero"',
          preview: (
            <WelkDropDown
              label="Starting role"
              options={options}
              defaultValue="hero"
            />
          ),
        },
        {
          title: "Disabled",
          description:
            "A selected value remains visible without allowing edits.",
          configuration: 'disabled defaultValue="hero"',
          preview: (
            <WelkDropDown
              label="Locked role"
              options={options}
              defaultValue="hero"
              disabled
            />
          ),
        },
      ];
    case "WelkIconButton":
      return [
        {
          title: "Icon only",
          description:
            "The label is accessible even though only the icon is visible. Activate to increment the count.",
          configuration: 'variant="default" label="Add a panel"',
          preview: <IconExample variant="default" />,
        },
        {
          title: "Icon and text",
          description: "The same label is displayed next to the icon.",
          configuration: 'variant="text"',
          preview: <IconExample variant="text" />,
        },
        {
          title: "Disabled",
          description: "Unavailable icon actions do not respond to activation.",
          configuration: "disabled",
          preview: <IconExample variant="default" disabled />,
        },
      ];
    case "WelkImage":
      return [
        {
          title: "Local asset",
          description:
            "Bundled artwork in the irregular frame. Set alt text and reserve space with dimensions.",
          configuration: 'variant="asset" src={comic}',
          preview: (
            <WelkImage
              variant="asset"
              src={comic}
              alt="Local comic panel"
              width={320}
              height={180}
              style={imageStyle}
            />
          ),
        },
        {
          title: "Network mode",
          description:
            "Paste a public image URL above the preview. Changes load immediately; inaccessible or invalid images show a fallback and an error message.",
          configuration: 'variant="network" src={url}',
          preview: <NetworkImageExample />,
        },
        {
          title: "Load failure and fallback",
          description:
            "A deliberately invalid image demonstrates fallbackSrc and the visible error status.",
          configuration: "src={brokenImage} fallbackSrc={comic}",
          preview: (
            <WelkImage
              src={brokenImage}
              fallbackSrc={comic}
              alt="Fallback comic panel"
              width={320}
              height={180}
              style={imageStyle}
            />
          ),
        },
      ];
    case "WelkInput":
      return [
        ...(["text", "email", "password", "search", "tel", "url"] as const).map(
          (type) => ({
            title: type,
            description: `Native ${type} behavior with a visible label. Validation and mobile keyboard behavior follow the input type.`,
            configuration: `type="${type}"`,
            preview: (
              <WelkInput
                label={`${type} example`}
                type={type}
                placeholder={
                  type === "email"
                    ? "hero@example.com"
                    : type === "url"
                      ? "https://example.com"
                      : "Enter a value"
                }
              />
            ),
          }),
        ),
        {
          title: "End action",
          description:
            "Use the trailing action to show or hide the password without changing its value.",
          configuration: "endAction={{ icon, label, onClick }}",
          preview: <InputActionExample />,
        },
        {
          title: "Disabled",
          description: "Native disabled field; excluded from form submission.",
          configuration: "disabled",
          preview: (
            <WelkInput
              label="Locked identity"
              defaultValue="Captain Welk"
              disabled
            />
          ),
        },
        {
          title: "Read only",
          description:
            "The value can still be focused and copied, but not edited.",
          configuration: "readOnly",
          preview: (
            <WelkInput
              label="Assigned identity"
              defaultValue="Captain Welk"
              readOnly
            />
          ),
        },
      ];
    case "WelkMenu":
      return [
        {
          title: "Flat",
          description: "Simple vertical links with exact-route active styling.",
          configuration: 'variant="default" activeRoute="/guide"',
          preview: <MenuExample />,
        },
        {
          title: "Nested",
          description:
            "Expand Components, then Forms to try recursive disclosures. Parent routes remain accessible.",
          configuration: 'variant="nested"',
          preview: <MenuExample nested />,
        },
        {
          title: "Collapsible",
          description:
            "Use the menu/close icon to animate the whole menu. Hidden content is inert.",
          configuration: 'variant="nested" collapsible',
          preview: <MenuExample nested collapsible />,
        },
      ];
    case "WelkOTPInput":
      return [
        {
          title: "Six digits",
          description:
            "Type or paste digits into a single native input, visually split into six slots.",
          configuration: "length={6}",
          preview: <WelkOTPInput label="Six-digit code" />,
        },
        {
          title: "Four digits",
          description:
            "Adjust the expected digit count to match your verification flow.",
          configuration: "length={4}",
          preview: <WelkOTPInput label="Four-digit code" length={4} />,
        },
        {
          title: "Controlled feedback",
          description:
            "The output reflects onValueChange as you type. This is not a real verification service.",
          configuration: "value={code} onValueChange={setCode}",
          preview: <ControlledExample kind="otp" />,
        },
        {
          title: "Disabled",
          description: "Displays a code without accepting input.",
          configuration: 'disabled defaultValue="123456"',
          preview: (
            <WelkOTPInput label="Locked code" defaultValue="123456" disabled />
          ),
        },
      ];
    case "WelkQRCode":
      return [
        {
          title: "Website URL",
          description:
            "A complete HTTPS address renders as a high-contrast QR code.",
          configuration: 'url="https://ui.welkdock.com"',
          preview: <WelkQRCode url="https://ui.welkdock.com" />,
        },
        {
          title: "Long URL",
          description:
            "Longer URLs produce denser codes. Keep the code large and unobstructed when displaying it.",
          configuration:
            'url="https://example.com/mission/briefing?team=welkui"',
          preview: (
            <WelkQRCode url="https://example.com/mission/briefing?team=welkui" />
          ),
        },
        {
          title: "Invalid URL",
          description:
            "URLs without an HTTP or HTTPS scheme show an accessible error.",
          configuration: 'url="welkdock.com"',
          preview: <WelkQRCode url="welkdock.com" />,
        },
        {
          title: "Card",
          description:
            "Add a heading, supporting copy and themed card background around the framed code.",
          configuration:
            'variant="card" title="Visit WelkUI" subtitle="Scan to explore." cardColor="#ffda57"',
          preview: (
            <WelkQRCode
              url="https://ui.welkdock.com"
              variant="card"
              title="Visit WelkUI"
              subtitle="Scan to explore the component library."
              cardColor="#ffda57"
            />
          ),
        },
        {
          title: "Original square modules",
          description:
            "Set originalCode to render traditional square modules with the same encoded URL.",
          configuration: "originalCode",
          preview: <WelkQRCode url="https://ui.welkdock.com" originalCode />,
        },
      ];
    case "WelkRadio":
      return [
        {
          title: "Shared-name options",
          description:
            "The checked, unchecked, and disabled appearances in one native mutually exclusive group.",
          configuration: 'name="shared-role" value="first" / value="second"',
          preview: <RadioExample />,
        },
        {
          title: "Disabled checked",
          description: "A selected radio can remain checked while disabled.",
          configuration: "disabled defaultChecked",
          preview: (
            <WelkRadio label="Locked selected option" disabled defaultChecked />
          ),
        },
      ];
    case "WelkRadioGroup":
      return [
        {
          title: "Uncontrolled selection",
          description:
            "Starts with Hero selected. Selecting Sidekick unchecks Hero.",
          configuration: 'defaultValue="hero" options={options}',
          preview: (
            <WelkRadioGroup
              label="Starting team role"
              options={options}
              defaultValue="hero"
            />
          ),
        },
        {
          title: "Controlled feedback",
          description:
            "The callback updates both the selected option and visible output.",
          configuration: "value={role} onValueChange={setRole}",
          preview: <ControlledExample kind="radio" />,
        },
        {
          title: "Disabled group",
          description: "The native fieldset disables every option at once.",
          configuration: "disabled",
          preview: (
            <WelkRadioGroup
              label="Locked team role"
              options={options}
              defaultValue="hero"
              disabled
            />
          ),
        },
      ];
    case "WelkRangeSlider":
      return [
        {
          title: "Live numeric value",
          description:
            "Drag the thumb or use arrow keys; onValueChange delivers a number.",
          configuration: "value={power} onValueChange={setPower}",
          preview: <ControlledExample kind="range" />,
        },
        {
          title: "Custom bounds and steps",
          description: "Move between 10 and 50 in increments of 10.",
          configuration: "min={10} max={50} step={10}",
          preview: (
            <WelkRangeSlider
              label="Power level"
              min={10}
              max={50}
              step={10}
              defaultValue={30}
            />
          ),
        },
        {
          title: "Disabled",
          description: "The thumb remains at its value but cannot move.",
          configuration: "disabled defaultValue={60}",
          preview: (
            <WelkRangeSlider label="Locked power" defaultValue={60} disabled />
          ),
        },
      ];
    case "WelkSnackBar":
      return [
        ...colors.map((variant) => ({
          title: variant,
          description: `Launch a ${variant} notification to compare its actual colors and comic animation.`,
          configuration: `variant="${variant}"`,
          preview: <SnackExample label={variant} variant={variant} />,
        })),
        ...positions.map((position) => ({
          title: position,
          description: `Launch at the viewport's ${position} anchor. Dismiss before comparing another position.`,
          configuration: `position="${position}"`,
          preview: <SnackExample label={position} position={position} />,
        })),
        {
          title: "Automatic dismissal",
          description:
            "Closes after 4 seconds; hover or focus pauses the countdown, leaving restarts it.",
          configuration: "autoHideDuration={4000}",
          preview: <SnackExample label="auto-hide" timed />,
        },
      ];
    case "WelkSticker":
      return [
        {
          title: "Default outline",
          description:
            "Transparent artwork reveals the silhouette. Reloading the image plays the sticking animation.",
          configuration: 'outlineThickness={6} outlineColor="white"',
          preview: (
            <WelkSticker
              src={superman}
              alt="Default Superman cutout"
              width={120}
              height={140}
            />
          ),
        },
        {
          title: "Colored thick outline",
          description:
            "Use a stronger outline to make artwork stand out on its surface.",
          configuration: 'outlineThickness={10} outlineColor="#ffdf52"',
          preview: (
            <WelkSticker
              src={superman}
              alt="Yellow outlined Superman cutout"
              width={120}
              height={140}
              outlineThickness={10}
              outlineColor="#ffdf52"
            />
          ),
        },
        {
          title: "Hover elevation",
          description:
            "Move over the sticker to lift it. Reduced-motion preferences are respected.",
          configuration: "elevateOnHover",
          preview: (
            <WelkSticker
              src={superman}
              alt="Hoverable Superman cutout"
              width={120}
              height={140}
              elevateOnHover
            />
          ),
        },
        {
          title: "No outline",
          description:
            "Zero thickness leaves just the artwork and its sticker presentation.",
          configuration: "outlineThickness={0}",
          preview: (
            <WelkSticker
              src={superman}
              alt="Unoutlined Superman cutout"
              width={120}
              height={140}
              outlineThickness={0}
            />
          ),
        },
        {
          title: "Fallback artwork",
          description:
            "An intentionally invalid source demonstrates recovery with local fallback artwork.",
          configuration: "src={brokenImage} fallbackSrc={superman}",
          preview: (
            <WelkSticker
              src={brokenImage}
              fallbackSrc={superman}
              alt="Recovered Superman cutout"
              width={120}
              height={140}
            />
          ),
        },
      ];
    case "WelkSwitch":
      return [
        {
          title: "Off",
          description:
            "Click the label or press Space on the switch to toggle it.",
          configuration: "defaultChecked={false}",
          preview: <WelkSwitch label="Enable bonus mode" />,
        },
        {
          title: "On",
          description:
            "An uncontrolled switch starts enabled and stays editable.",
          configuration: "defaultChecked",
          preview: <WelkSwitch label="Bonus mode enabled" defaultChecked />,
        },
        {
          title: "Controlled feedback",
          description:
            "A parent-owned boolean updates the switch and the visible output.",
          configuration: "checked={enabled} onCheckedChange={setEnabled}",
          preview: <ControlledExample kind="switch" />,
        },
        {
          title: "Disabled states",
          description:
            "Both off and on states remain readable without accepting changes.",
          configuration: "disabled / disabled defaultChecked",
          preview: (
            <div className="stack">
              <WelkSwitch label="Locked off" disabled />
              <WelkSwitch label="Locked on" disabled defaultChecked />
            </div>
          ),
        },
      ];
    case "WelkTabs":
      return [
        ...(["horizontal", "vertical"] as const).map((orientation) => ({
          title:
            orientation === "horizontal"
              ? "With background"
              : "With background vertical",
          description:
            "Toggle-style tabs share a background and stay detached from the content panel.",
          configuration: `variant="withBg" orientation="${orientation}"`,
          preview: (
            <WelkTabs
              label="Mission sections"
              variant="withBg"
              orientation={orientation}
              items={[
                {
                  label: "Overview",
                  value: "overview",
                  content: "A quick overview of your next mission.",
                },
                {
                  label: "Objectives",
                  value: "objectives",
                  content: "Complete the mission and return safely.",
                },
                {
                  label: "Locked",
                  value: "locked",
                  content: "This panel is not available.",
                  disabled: true,
                },
              ]}
            />
          ),
        })),
        {
          title: "Horizontal",
          description: "The default layout for switching related panels.",
          configuration: 'orientation="horizontal"',
          preview: (
            <WelkTabs
              label="Mission sections"
              items={[
                {
                  label: "Overview",
                  value: "overview",
                  content: "A quick overview of your next mission.",
                },
                {
                  label: "Objectives",
                  value: "objectives",
                  content: "Complete the mission and return safely.",
                },
              ]}
            />
          ),
        },
        {
          title: "Vertical",
          description: "A side-by-side layout for longer tab labels or panels.",
          configuration: 'orientation="vertical"',
          preview: (
            <WelkTabs
              label="Mission sections"
              orientation="vertical"
              items={[
                {
                  label: "Overview",
                  value: "overview",
                  content: "A quick overview of your next mission.",
                },
                {
                  label: "Objectives",
                  value: "objectives",
                  content: "Complete the mission and return safely.",
                },
              ]}
            />
          ),
        },
        {
          title: "Disabled tab",
          description: "Disabled tabs are skipped during keyboard navigation.",
          configuration: "disabled",
          preview: (
            <WelkTabs
              label="Mission sections"
              defaultValue="objectives"
              items={[
                {
                  label: "Overview",
                  value: "overview",
                  content: "A quick overview of your next mission.",
                },
                {
                  label: "Objectives",
                  value: "objectives",
                  content: "Complete the mission and return safely.",
                },
                {
                  label: "Locked",
                  value: "locked",
                  content: "This panel is not available.",
                  disabled: true,
                },
              ]}
            />
          ),
        },
      ];
    case "WelkTimePicker":
      return [
        {
          title: "Hours and minutes",
          description: "Use 24-hour HH:mm input or open the three-row wheels.",
          configuration: 'defaultValue="14:30"',
          preview: (
            <WelkTimePicker label="Departure time" defaultValue="14:30" />
          ),
        },
        {
          title: "With seconds",
          description: "Adds a seconds wheel and accepts HH:mm:ss values.",
          configuration: 'showSeconds defaultValue="14:30:45"',
          preview: (
            <WelkTimePicker
              label="Precise departure"
              showSeconds
              defaultValue="14:30:45"
            />
          ),
        },
        {
          title: "Empty",
          description:
            "Start without a value and let the user type or choose a time.",
          configuration: 'defaultValue=""',
          preview: <WelkTimePicker label="Choose departure" />,
        },
        {
          title: "Disabled",
          description:
            "The value remains visible without allowing manual or wheel edits.",
          configuration: "disabled",
          preview: (
            <WelkTimePicker
              label="Locked departure"
              defaultValue="14:30"
              disabled
            />
          ),
        },
      ];
    case "WelkTooltip":
      return (["bubble", "speech", "speach"] as const).map((variant) => ({
        title: variant,
        description:
          variant === "speach"
            ? "Compatibility spelling: renders the same speech-tail silhouette as speech."
            : `Hover or focus the trigger to reveal the ${variant === "bubble" ? "thinking-bubble" : "speech-tail"} shape. Escape dismisses it.`,
        configuration: `variant="${variant}" content="A helpful hint"`,
        preview: (
          <div className="variantTooltip">
            <WelkTooltip variant={variant} content="A helpful hint">
              <WelkButton>{variant} hint</WelkButton>
            </WelkTooltip>
          </div>
        ),
      }));
  }
}

export function VariantGallery({ name }: { name: ComponentName }) {
  const examples = examplesFor(name);
  return (
    <section aria-label={`${name} visual variants`} className="variantGallery">
      <p>
        These are real components, not screenshots. Compare their appearance and
        try the controls. Key props below each preview show what changes; use
        the usage example above for imports and component setup.
      </p>
      <div className="variantGrid">
        {examples.map(({ title, description, configuration, preview }) => (
          <article className="surface variantExample" key={title}>
            <h4>{title}</h4>
            <p className="finePrint">{description}</p>
            <div className="variantPreview">{preview}</div>
            <div className="variantConfiguration">
              <span className="finePrint">Key props</span>
              <code>{configuration}</code>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
