import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFile(resolve(root, path), "utf8");
const pkg = JSON.parse(await read("package.json"));
assert.equal(pkg.name, "@welkui/react");
assert.ok(!pkg.dependencies?.react && !pkg.dependencies?.["react-dom"]);
assert.ok(pkg.peerDependencies.react && pkg.peerDependencies["react-dom"]);

const [pack] = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }),
);
const files = new Set(pack.files.map(({ path }) => path));
for (const path of [
  "dist/index.js",
  "dist/index.d.ts",
  "dist/styles.css",
  "dist/fonts/ShortStack-OFL.txt",
  "dist/licenses/QR-CODE-DEPENDENCIES.txt",
  "LICENSE",
]) {
  assert.ok(files.has(path), `Package is missing ${path}`);
}
assert.ok([...files].every((path) => !/\.(test|stories)\./.test(path)));
const stylesheet = await read("dist/styles.css");
assert.ok(stylesheet.includes("--welk-color-accent"));
assert.ok(stylesheet.includes("prefers-reduced-motion"));
const font = await readFile(
  resolve(root, "assets/font/short_stack/ShortStack-Regular.ttf"),
);
assert.ok(
  stylesheet.includes(font.toString("base64")),
  "The package stylesheet must embed the Short Stack font",
);
assert.equal(
  await read("dist/fonts/ShortStack-OFL.txt"),
  await read("assets/font/short_stack/OFL.txt"),
);
assert.ok(!(await read("dist/index.js")).startsWith('"use client"'));

for (const name of [
  "WelkButton",
  "WelkCheckBox",
  "WelkAccordion",
  "WelkInput",
  "WelkAvatar",
  "WelkDialog",
  "WelkRadio",
  "WelkRadioGroup",
  "WelkImage",
  "WelkCard",
  "WelkIconButton",
  "WelkTooltip",
  "WelkDatePicker",
  "WelkDateInput",
  "WelkOTPInput",
  "WelkDivider",
  "WelkSticker",
  "WelkRangeSlider",
  "WelkTimePicker",
  "WelkDropDown",
  "WelkStickerCard",
  "WelkSnackBar",
  "WelkAttachment",
  "WelkBreadCrumbs",
  "WelkBadge",
  "WelkSwitch",
  "WelkDrawer",
  "WelkMenu",
  "WelkQRCode",
]) {
  const base = `dist/components/${name}/${name}`;
  assert.ok((await read(`${base}.js`)).startsWith('"use client";'));
  assert.ok(files.has(`${base}.types.d.ts`));
  assert.ok((await read("dist/index.js")).includes(name));
}

for (const entry of await readdir(resolve(root, "dist"), { recursive: true })) {
  if (!entry.endsWith(".js")) continue;
  const code = await read(`dist/${entry}`);
  assert.ok(!code.includes("react.production"), "React must not be bundled");
  for (const [, specifier] of code.matchAll(/from\s*["']([^"']+)["']/g)) {
    if (specifier.startsWith(".")) {
      const target = resolve(root, "dist", dirname(entry), specifier);
      assert.ok(
        files.has(target.slice(root.length)),
        `Missing module: ${target}`,
      );
    } else {
      assert.match(specifier, /^(react|react-dom)(\/|$)/);
    }
  }
}

const bundle = await build({
  configFile: false,
  logLevel: "silent",
  plugins: [
    {
      name: "button-only-consumer",
      resolveId(id) {
        if (id.endsWith("virtual:button-only")) return "\0virtual:button-only";
      },
      load(id) {
        if (id === "\0virtual:button-only") {
          return `export { WelkButton } from ${JSON.stringify(resolve(root, "dist/index.js"))};`;
        }
      },
    },
  ],
  build: {
    write: false,
    minify: false,
    lib: { entry: "virtual:button-only", formats: ["es"] },
    rollupOptions: {
      external: (id) => /^(react|react-dom)(\/|$)/.test(id),
    },
  },
});
const outputs = Array.isArray(bundle) ? bundle : [bundle];
assert.ok(outputs.every((output) => "output" in output));
const consumerCode = outputs
  .flatMap((output) => output.output)
  .filter((entry) => entry.type === "chunk")
  .map((entry) => entry.code)
  .join("\n");
assert.ok(consumerCode.includes("WelkButton"));
assert.ok(!consumerCode.includes("WelkCheckBox"));
assert.ok(!consumerCode.includes("WelkAccordion"));
assert.ok(!consumerCode.includes("WelkInput"));
assert.ok(!consumerCode.includes("WelkAvatar"));
assert.ok(!consumerCode.includes("WelkDialog"));
assert.ok(!consumerCode.includes("WelkRadio"));
assert.ok(!consumerCode.includes("WelkRadioGroup"));
assert.ok(!consumerCode.includes("WelkImage"));
assert.ok(!consumerCode.includes("WelkCard"));
assert.ok(!consumerCode.includes("WelkIconButton"));
assert.ok(!consumerCode.includes("WelkTooltip"));
assert.ok(!consumerCode.includes("WelkDatePicker"));
assert.ok(!consumerCode.includes("WelkDateInput"));
assert.ok(!consumerCode.includes("WelkOTPInput"));
assert.ok(!consumerCode.includes("WelkDivider"));
assert.ok(!consumerCode.includes("WelkSticker"));
assert.ok(!consumerCode.includes("WelkRangeSlider"));
assert.ok(!consumerCode.includes("WelkTimePicker"));
assert.ok(!consumerCode.includes("WelkDropDown"));
assert.ok(!consumerCode.includes("WelkStickerCard"));
assert.ok(!consumerCode.includes("WelkSnackBar"));
assert.ok(!consumerCode.includes("WelkAttachment"));
assert.ok(!consumerCode.includes("WelkBreadCrumbs"));
assert.ok(!consumerCode.includes("WelkBadge"));
assert.ok(!consumerCode.includes("WelkSwitch"));
assert.ok(!consumerCode.includes("WelkDrawer"));
assert.ok(!consumerCode.includes("WelkMenu"));
console.log(
  `Verified ${files.size} packaged files, stylesheet, declarations, client boundaries and tree shaking.`,
);
