# Contributing to WelkUI

Thanks for helping make interfaces a little more comical! 🎨 This guide covers
everything from picking an issue to getting your pull request merged.

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Ways to contribute](#ways-to-contribute)
- [Workflow at a glance](#workflow-at-a-glance)
- [Working on an issue](#working-on-an-issue)
- [Local setup](#local-setup)
- [Branches, commits and pull requests](#branches-commits-and-pull-requests)
- [Adding or changing a component](#adding-or-changing-a-component)
- [Accessibility checklist](#accessibility-checklist)
- [Validation](#validation)
- [Review and merge](#review-and-merge)
- [Releases](#releases)

## Code of conduct

Be kind, patient and constructive. Critique code, not people. Harassment,
discrimination or personal attacks are not tolerated — report them privately
to the maintainers through [welkdock.com](https://www.welkdock.com).

## Ways to contribute

- 🐛 **Report a bug** — use the [bug report template](https://github.com/welkdock/welkUI/issues/new?template=bug_report.yml).
- 💡 **Request a component or feature** — use the [feature request template](https://github.com/welkdock/welkUI/issues/new?template=feature_request.yml).
- 🛠️ **Fix an issue** — look for [`good first issue`](https://github.com/welkdock/welkUI/labels/good%20first%20issue) and [`help wanted`](https://github.com/welkdock/welkUI/labels/help%20wanted).
- 📝 **Improve docs** — README, [component API](./docs/COMPONENTS.md), Storybook stories or the showcase site.

## Workflow at a glance

```text
Issue #42 ──► comment "I'd like to work on this" ──► fork & branch feat/42-welk-tabs
   ──► code + tests + docs ──► pnpm check ──► PR "feat(WelkTabs): add tabs (#42)" with "Closes #42"
   ──► review ──► squash merge ──► issue closes automatically
```

## Working on an issue

Every non-trivial change should be linked to an issue. **Always mention the
issue number** so work stays traceable.

1. **Find or open an issue.** Search [existing issues](https://github.com/welkdock/welkUI/issues)
   first. For typos and tiny doc fixes you may skip this step.
2. **Claim it.** Comment on the issue (e.g. _"I'd like to work on this"_) and
   wait for a maintainer to assign you, so two people don't build the same thing.
   If you can no longer work on it, comment so it can be reassigned.
3. **Discuss the approach** on the issue for new components or public API
   changes (props, names, variants) before writing a lot of code.
4. **Use the issue number everywhere:**

   | Where    | Format                                  | Example                                     |
   | -------- | --------------------------------------- | ------------------------------------------- |
   | Branch   | `<type>/<issue>-<short-description>`    | `fix/57-switch-focus-ring`                  |
   | Commit   | `<type>(<scope>): <summary> (#<issue>)` | `fix(WelkSwitch): restore focus ring (#57)` |
   | PR title | same as the main commit                 | `fix(WelkSwitch): restore focus ring (#57)` |
   | PR body  | closing keyword                         | `Closes #57`                                |

   Use `Closes #57`, `Fixes #57` or `Resolves #57` so GitHub closes the issue on
   merge. For partial work, use `Refs #57` instead. Link several issues with one
   keyword per issue: `Closes #57, closes #61`.

## Local setup

Requirements: **Node.js 24** (20.19+ supported) and **pnpm 10.20.0**.

```bash
# 1. Fork welkdock/welkUI on GitHub, then:
git clone https://github.com/<your-username>/welkUI.git
cd welkUI
git remote add upstream https://github.com/welkdock/welkUI.git

# 2. Install and build
pnpm install          # or: npx pnpm@10.20.0 install
pnpm build

# 3. Develop
pnpm storybook                                   # http://localhost:6006
pnpm --filter @welkui/example-react-vite dev     # showcase website
pnpm test:watch
```

Keep your branch current with `git fetch upstream && git rebase upstream/main`.
The React Vite showcase uses the component source during development, matching
Storybook without requiring a rebuild after changing `src/`. Production showcase
builds and the Next.js example use the **built** library, so run `pnpm build`
before validating those.

The showcase contributors page fetches the public GitHub contributors API in the
browser, featuring the top three by contribution count and listing the rest as
compact avatars. No token is required; loading, empty and rate-limit/error states
are displayed, with a retry action and a link to GitHub.

## Branches, commits and pull requests

### Branch names

`<type>/<issue>-<short-kebab-description>`, branched from the latest `main`:

```text
feat/42-welk-tabs
fix/57-switch-focus-ring
docs/63-drawer-examples
```

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <imperative summary> (#<issue>)

<optional body: what and why>

Closes #<issue>
```

| Type           | Use for                                  |
| -------------- | ---------------------------------------- |
| `feat`         | New component, prop or variant           |
| `fix`          | Bug fix                                  |
| `docs`         | README, API docs, stories, showcase copy |
| `style`        | Formatting only (no behavior change)     |
| `refactor`     | Code change without behavior change      |
| `test`         | Adding or fixing tests                   |
| `perf`         | Performance improvement                  |
| `build` / `ci` | Build tooling, workflows                 |
| `chore`        | Maintenance, dependencies                |

Use the component name as the scope (`WelkMenu`, `WelkDrawer`) or an area
(`theme`, `site`, `build`). Mark breaking changes with `!` and a footer:

```text
feat(WelkButton)!: rename tone prop to variant (#71)

BREAKING CHANGE: `tone` was renamed to `variant`.
```

### Pull requests

- Keep each PR focused on one issue; split unrelated changes.
- Fill in the [pull request template](./.github/PULL_REQUEST_TEMPLATE.md),
  including `Closes #<issue>`.
- Add screenshots or a short recording for any visual change.
- Open a **draft PR** early if you want feedback.
- Never commit secrets, build output (`dist/`) or generated tarballs.

## Adding or changing a component

New components live in `src/components/WelkName/`:

```text
src/components/WelkName/
├── WelkName.tsx          # implementation, starts with "use client" if interactive
├── WelkName.types.ts     # exported props types
├── WelkName.module.css   # styles using --welk-* tokens
├── WelkName.test.tsx     # Vitest + Testing Library
├── WelkName.stories.tsx  # Storybook stories for every variant
└── index.ts              # local barrel
```

Checklist:

- [ ] Re-export the component and its props from the local `index.ts` and
      [src/components/index.ts](./src/components/index.ts).
- [ ] Start interactive implementations with `"use client"`. Barrels stay unmarked.
- [ ] Prefer native elements (`button`, `input`, `dialog`…), forward refs and
      pass through native attributes and `className`.
- [ ] Style with CSS Modules and existing theme tokens. No global resets and no
      new runtime dependencies; React stays a peer dependency.
- [ ] Follow the comic look: solid ink borders, uneven corners, hard shadows,
      Short Stack font and reduced-motion-aware animations.
- [ ] Add tests for behavior, keyboard interaction and accessibility.
- [ ] Add stories for each variant, size and state.
- [ ] Add the component to the showcase site in
      [examples/react-vite/src](./examples/react-vite/src): `catalogue.tsx`,
      `componentDocs.ts`, `componentGuides.ts` and `VariantGallery.tsx`
      (it then gets its own pre-rendered page and sitemap entry).
- [ ] Document props in [docs/COMPONENTS.md](./docs/COMPONENTS.md) and add it
      to the README component table.
- [ ] Add an entry to [CHANGELOG.md](./CHANGELOG.md) under the unreleased version.
- [ ] Only add assets (fonts, icons, images) whose license allows redistribution.

## Accessibility checklist

- [ ] Fully usable with keyboard only; focus order is logical.
- [ ] Focus indicator is clearly visible.
- [ ] Every control has an accessible name (label, `aria-label` or `aria-labelledby`).
- [ ] Correct roles and states (`aria-expanded`, `aria-checked`, `aria-invalid`…).
- [ ] Disabled and error states work and are announced.
- [ ] Text and borders keep sufficient contrast.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] Works at 200% zoom and on small screens.

## Validation

Run these before pushing. CI runs the same checks on every pull request.

```bash
pnpm format              # Prettier
pnpm check               # ESLint + TypeScript + Vitest
pnpm build               # library
pnpm verify:package      # package contents and client boundaries
pnpm build:examples      # React + Next.js consumers and the showcase site
pnpm build-storybook
```

Also check visual changes in Storybook and the showcase site, in light of
keyboard focus, disabled states, form behavior and reduced motion.

## Review and merge

1. CI must be green and the PR template completed.
2. At least one maintainer approval is required. Reply to every review comment
   and push follow-up commits; don't force-push over a review in progress.
3. Maintainers **squash merge** with the conventional PR title, so the issue
   number lands in `main`'s history and the linked issue closes automatically.
4. You are added to the [contributors page](https://ui.welkdock.com/contributors/)
   and the README contributor wall. 🎉

## Releases

Maintainers handle releases. See the [publishing instructions](./README.md#publishing).

---

Questions? Open a [discussion-style issue](https://github.com/welkdock/welkUI/issues/new/choose)
or reach the team at [welkdock.com](https://www.welkdock.com).
