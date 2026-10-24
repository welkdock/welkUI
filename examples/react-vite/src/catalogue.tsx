import { useState } from "react";
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
import type { WelkDrawerPosition, WelkSnackBarPosition } from "@welkui/react";
import superman from "../../../assets/images/superman.png";
import comic from "../../../assets/images/comic_bg_04.jpg";

export const catalogue = [
  {
    name: "WelkAccordion",
    info: "Expandable content. Use title and children; nested and horizontal variants are available.",
    code: '<WelkAccordion title="The details">A little more to discover.</WelkAccordion>',
  },
  {
    name: "WelkAttachment",
    info: "Select local files with previews. Optional maxFiles, maxFileSize (bytes), and accept. Upload files yourself.",
    code: '<WelkAttachment label="Mission files" maxFiles={3}\n  maxFileSize={5242880} accept="image/*,.pdf"\n  onFilesChange={(files) => console.log(files)} />',
  },
  {
    name: "WelkAvatar",
    info: "Built-in portraits or your own src/icon. Requires descriptive alt text.",
    code: '<WelkAvatar variant="female-admin" alt="Mission leader" size="lg" />',
  },
  {
    name: "WelkBadge",
    info: "Small text or count labels. Five color variants; sizes sm, md, lg.",
    code: '<WelkBadge variant="success">Ready!</WelkBadge>',
  },
  {
    name: "WelkBreadCrumbs",
    info: "A navigation trail. The final item is the current page; omit href for plain text.",
    code: '<WelkBreadCrumbs items={[\n  { label: "Home", href: "/" },\n  { label: "Components", href: "/components/" },\n  { label: "Current page" },\n]} />',
  },
  {
    name: "WelkButton",
    info: "Native button props, semantic color variants, and three sizes. onClick handles actions.",
    code: "const [count, setCount] = useState(0);\n\n<WelkButton onClick={() => setCount(count + 1)}>\n  Clicked {count} times\n</WelkButton>",
  },
  {
    name: "WelkCard",
    info: "Clickable title/subtitle card. Supports an optional icon, disabled, and growOnHover.",
    code: '<WelkCard title="Your next mission" subtitle="Tap to accept."\n  onClick={() => console.log("Accepted")} />',
  },
  {
    name: "WelkCheckBox",
    info: "A native checkbox with a visible label. Use checked/onChange or defaultChecked.",
    code: '<WelkCheckBox label="Keep it playful" defaultChecked />',
  },
  {
    name: "WelkDateInput",
    info: "An editable date field opening our custom calendar. Values use YYYY-MM-DD.",
    code: '<WelkDateInput label="Launch date" defaultValue="2026-10-23" />',
  },
  {
    name: "WelkDatePicker",
    info: "Full-month custom calendar with manual entry and month navigation. Supports min/max.",
    code: '<WelkDatePicker label="Pick a date" defaultValue="2026-10-23"\n  onValueChange={(date) => console.log(date)} />',
  },
  {
    name: "WelkDialog",
    info: "Controlled native modal. Update open in onClose. Confirmation mode provides Yes/No actions.",
    code: 'const [open, setOpen] = useState(false);\n\n<WelkButton onClick={() => setOpen(true)}>Open dialog</WelkButton>\n<WelkDialog open={open} onClose={() => setOpen(false)}\n  title="Ready for adventure?" type="confirmation">\n  Choose your next chapter.\n</WelkDialog>',
  },
  {
    name: "WelkDivider",
    info: "Horizontal or vertical separator. Plain, dotted, dashed variants; thickness in pixels.",
    code: '<WelkDivider variant="dashed" thickness={3} />',
  },
  {
    name: "WelkDrawer",
    info: "Controlled modal panel from left, right, top, or bottom. Escape and optional backdrop dismissal.",
    code: 'const [open, setOpen] = useState(false);\n\n<WelkButton onClick={() => setOpen(true)}>Open drawer</WelkButton>\n<WelkDrawer open={open} onClose={() => setOpen(false)}\n  title="Mission control" position="right" closeOnTapOutside>\n  Your settings go here.\n</WelkDrawer>',
  },
  {
    name: "WelkDropDown",
    info: "Select a value from label/value options. searchable enables built-in filtering.",
    code: '<WelkDropDown label="Choose a hero" searchable options={[\n  { label: "Superman", value: "superman" },\n  { label: "Batman", value: "batman" },\n]} />',
  },
  {
    name: "WelkIconButton",
    info: 'Icon-only button requires an accessible label. variant="text" also shows that label.',
    code: '<WelkIconButton label="Add item" icon={<span>+</span>}\n  onClick={() => console.log("Added")} />',
  },
  {
    name: "WelkImage",
    info: "Distorted image frame. Network images support fallbackSrc; asset mode uses native errors.",
    code: '<WelkImage variant="asset" src={comic} alt="Comic artwork"\n  width={400} height={220} />',
  },
  {
    name: "WelkInput",
    info: "Labeled native text input. Supports common text types, native props, and an optional endAction.",
    code: '<WelkInput label="Hero name" placeholder="Captain Welk" />',
  },
  {
    name: "WelkMenu",
    info: "Vertical route list. nested expands children; collapsible adds an animated menu toggle.",
    code: '<WelkMenu variant="nested" collapsible items={[\n  { title: "Home", route: "/" },\n  { title: "Components", route: "/components/", children: [\n    { title: "Button", route: "/components/WelkButton/" },\n  ] },\n]} />',
  },
  {
    name: "WelkOTPInput",
    info: "Single native input styled as digit boxes. Six digits by default; length is configurable.",
    code: '<WelkOTPInput label="Verification code" length={6}\n  onComplete={(code) => console.log(code)} />',
  },
  {
    name: "WelkQRCode",
    info: "Generate a scannable QR code for an absolute HTTP or HTTPS URL. The optional card variant adds a title, subtitle and customizable background.",
    code: '<WelkQRCode url="https://ui.welkdock.com" />\n<WelkQRCode url="https://ui.welkdock.com" originalCode />',
  },
  {
    name: "WelkRadio",
    info: "Native radio input with a visible label. Share a name to create mutually exclusive choices.",
    code: '<WelkRadio label="Hero" name="role" value="hero" />\n<WelkRadio label="Sidekick" name="role" value="sidekick" />',
  },
  {
    name: "WelkRadioGroup",
    info: "Labeled fieldset of radio options. Supports value/onValueChange or defaultValue.",
    code: '<WelkRadioGroup label="Choose your role" name="role"\n  defaultValue="hero" options={[\n    { label: "Hero", value: "hero" },\n    { label: "Sidekick", value: "sidekick" },\n  ]} />',
  },
  {
    name: "WelkRangeSlider",
    info: "Native numeric range control. Set min, max, step, and onValueChange as needed.",
    code: '<WelkRangeSlider label="Hero power" min={0} max={100}\n  defaultValue={60} onValueChange={(value) => console.log(value)} />',
  },
  {
    name: "WelkSnackBar",
    info: "Controlled notification with six positions. Optional autoHideDuration in milliseconds; 0 is manual.",
    code: 'const [open, setOpen] = useState(false);\n\n<WelkButton onClick={() => setOpen(true)}>Notify me</WelkButton>\n<WelkSnackBar open={open} onClose={() => setOpen(false)}\n  message="POW! Saved." position="bottom-middle" />',
  },
  {
    name: "WelkSticker",
    info: "Animated silhouette outline. Transparent artwork works best; customize outlineThickness and outlineColor.",
    code: '<WelkSticker src={superman} alt="Superman sticker"\n  width={140} height={160} elevateOnHover />',
  },
  {
    name: "WelkStickerCard",
    info: "Content-sized card with an oversized left sticker. Both grow together on hover.",
    code: '<WelkStickerCard title="A super adventure" subtitle="Start your mission."\n  sticker={{ src: superman, alt: "" }}\n  onClick={() => console.log("Mission accepted")} />',
  },
  {
    name: "WelkSwitch",
    info: "Regular pill switch with comic colors. Supports checked/onCheckedChange and native form props.",
    code: '<WelkSwitch label="Hero mode" defaultChecked\n  onCheckedChange={(checked) => console.log(checked)} />',
  },
  {
    name: "WelkTabs",
    info: "Detached tabs with default and withBg toggle-style variants. Supports controlled or uncontrolled selection and keyboard navigation.",
    code: 'const items = [\n  { label: "Overview", value: "overview", content: "Mission overview." },\n  { label: "Objectives", value: "objectives", content: "Mission objectives." },\n];\n\n<WelkTabs label="Mission information" items={items} />\n<WelkTabs label="Mission information with background"\n  variant="withBg" items={items} />',
  },
  {
    name: "WelkTimePicker",
    info: "24-hour custom wheels and manual entry. showSeconds changes HH:mm to HH:mm:ss.",
    code: '<WelkTimePicker label="Mission time" defaultValue="14:30" />',
  },
  {
    name: "WelkTooltip",
    info: "Wrap one focusable component. bubble is thinking; speech adds a speech tail. Hover or focus to reveal.",
    code: '<WelkTooltip variant="speech" content="You have got this!">\n  <WelkButton>Hover or focus me</WelkButton>\n</WelkTooltip>',
  },
] as const;

export type ComponentName = (typeof catalogue)[number]["name"];

export function ComponentDemo({ name }: { name: ComponentName }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<WelkDrawerPosition>("right");
  const [snackPosition, setSnackPosition] =
    useState<WelkSnackBarPosition>("bottom-middle");
  const [sequence, setSequence] = useState(0);
  const options = [
    { label: "Superman", value: "superman" },
    { label: "Batman", value: "batman" },
  ];
  switch (name) {
    case "WelkAccordion":
      return (
        <WelkAccordion title="The details">
          A little more to discover.
        </WelkAccordion>
      );
    case "WelkAttachment":
      return (
        <WelkAttachment
          label="Mission files"
          maxFiles={3}
          maxFileSize={5242880}
          accept="image/*,.pdf"
        />
      );
    case "WelkAvatar":
      return (
        <WelkAvatar variant="female-admin" alt="Mission leader" size="lg" />
      );
    case "WelkBadge":
      return (
        <div className="row">
          {(["default", "info", "success", "warning", "error"] as const).map(
            (variant) => (
              <WelkBadge key={variant} variant={variant}>
                {variant}
              </WelkBadge>
            ),
          )}
        </div>
      );
    case "WelkBreadCrumbs":
      return (
        <WelkBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components/" },
            { label: "Current page" },
          ]}
        />
      );
    case "WelkButton":
      return (
        <WelkButton onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </WelkButton>
      );
    case "WelkCard":
      return (
        <>
          <WelkCard
            title="Your next mission"
            subtitle="Tap to accept."
            onClick={() => setMessage("Mission accepted!")}
          />
          <p role="status">{message}</p>
        </>
      );
    case "WelkCheckBox":
      return <WelkCheckBox label="Keep it playful" defaultChecked />;
    case "WelkDateInput":
      return <WelkDateInput label="Launch date" defaultValue="2026-10-23" />;
    case "WelkDatePicker":
      return <WelkDatePicker label="Pick a date" defaultValue="2026-10-23" />;
    case "WelkDialog":
      return (
        <>
          <WelkButton onClick={() => setOpen(true)}>Open dialog</WelkButton>
          <WelkDialog
            open={open}
            onClose={() => setOpen(false)}
            title="Ready for adventure?"
            type="confirmation"
          >
            Choose your next chapter.
          </WelkDialog>
        </>
      );
    case "WelkDivider":
      return (
        <div className="stack">
          <WelkDivider />
          <WelkDivider variant="dotted" thickness={3} />
          <WelkDivider variant="dashed" thickness={3} />
        </div>
      );
    case "WelkDrawer":
      return (
        <>
          <div className="row">
            {(["left", "right", "top", "bottom"] as const).map((edge) => (
              <WelkButton
                key={edge}
                onClick={() => {
                  setPosition(edge);
                  setOpen(true);
                }}
              >
                Open {edge}
              </WelkButton>
            ))}
          </div>
          <WelkDrawer
            open={open}
            onClose={() => setOpen(false)}
            title="Mission control"
            position={position}
            closeOnTapOutside
          >
            Your settings go here.
          </WelkDrawer>
        </>
      );
    case "WelkDropDown":
      return (
        <WelkDropDown label="Choose a hero" searchable options={options} />
      );
    case "WelkIconButton":
      return (
        <>
          <WelkIconButton
            label="Add item"
            icon={<span>+</span>}
            onClick={() => setCount(count + 1)}
          />
          <p role="status">{count} items added</p>
        </>
      );
    case "WelkImage":
      return (
        <WelkImage
          variant="asset"
          src={comic}
          alt="Comic artwork"
          width={400}
          height={220}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    case "WelkInput":
      return <WelkInput label="Hero name" placeholder="Captain Welk" />;
    case "WelkMenu":
      return (
        <WelkMenu
          variant="nested"
          collapsible
          items={[
            { title: "Home", route: "/" },
            {
              title: "Components",
              route: "/components/",
              children: [{ title: "Button", route: "/components/WelkButton/" }],
            },
          ]}
        />
      );
    case "WelkOTPInput":
      return <WelkOTPInput label="Verification code" length={6} />;
    case "WelkQRCode":
      return <WelkQRCode url="https://ui.welkdock.com" />;
    case "WelkRadio":
      return (
        <div className="stack">
          <WelkRadio label="Hero" name="demo-role" value="hero" />
          <WelkRadio label="Sidekick" name="demo-role" value="sidekick" />
        </div>
      );
    case "WelkRadioGroup":
      return (
        <WelkRadioGroup
          label="Choose your role"
          name="demo-group"
          defaultValue="hero"
          options={[
            { label: "Hero", value: "hero" },
            { label: "Sidekick", value: "sidekick" },
          ]}
        />
      );
    case "WelkRangeSlider":
      return <WelkRangeSlider label="Hero power" defaultValue={60} />;
    case "WelkSnackBar":
      return (
        <>
          <div className="row">
            {(
              [
                "top-left",
                "top-middle",
                "top-right",
                "bottom-left",
                "bottom-middle",
                "bottom-right",
              ] as const
            ).map((edge) => (
              <WelkButton
                key={edge}
                onClick={() => {
                  setSnackPosition(edge);
                  setSequence(sequence + 1);
                  setOpen(true);
                }}
              >
                {edge}
              </WelkButton>
            ))}
          </div>
          <WelkSnackBar
            key={sequence}
            open={open}
            onClose={() => setOpen(false)}
            message="POW! Saved."
            position={snackPosition}
          />
        </>
      );
    case "WelkSticker":
      return (
        <WelkSticker
          src={superman}
          alt="Superman sticker"
          width={140}
          height={160}
          elevateOnHover
        />
      );
    case "WelkStickerCard":
      return (
        <WelkStickerCard
          title="A super adventure"
          subtitle="Start your mission."
          sticker={{ src: superman, alt: "" }}
          onClick={() => setMessage("Mission accepted!")}
          aria-label={message || "Start your mission"}
        />
      );
    case "WelkSwitch":
      return <WelkSwitch label="Hero mode" defaultChecked />;
    case "WelkTabs":
      return (
        <div className="stack">
          {(["default", "withBg"] as const).map((variant) => (
            <div key={variant}>
              <p>
                <strong>
                  {variant === "default" ? "Default" : "With background"}
                </strong>
              </p>
              <WelkTabs
                label={
                  variant === "default"
                    ? "Mission information"
                    : "Mission information with background"
                }
                variant={variant}
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
                    label: "Disabled",
                    value: "disabled",
                    content: "This tab is not currently available.",
                    disabled: true,
                  },
                ]}
              />
            </div>
          ))}
        </div>
      );
    case "WelkTimePicker":
      return <WelkTimePicker label="Mission time" defaultValue="14:30" />;
    case "WelkTooltip":
      return (
        <div className="tooltipDemo">
          <WelkTooltip variant="speech" content="You have got this!">
            <WelkButton>Hover or focus me</WelkButton>
          </WelkTooltip>
        </div>
      );
  }
}
