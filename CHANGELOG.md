# Changelog

All notable changes to this project will be documented in this file.

## v4.0.1

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v4.0.0...v4.0.1)

### 🏡 Chore

- Fix copy in modal for execCommand fallback ([#151](https://github.com/sudodoki/copy-to-clipboard/pull/151))
- Add changelog ([#153](https://github.com/sudodoki/copy-to-clipboard/pull/153))

### ✅ Tests

- Add e2e scenario for modal tests ([#152](https://github.com/sudodoki/copy-to-clipboard/pull/152))

### ❤️ Contributors

- Джон, Просто Джон ([@sudodoki](https://github.com/sudodoki))

## v4.0.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.3.3...v4.0.0)

### ⚠️ Breaking Changes

- `copy()` is now async — returns `Promise<boolean>` instead of `boolean`. All call sites must be updated to `await copy(...)` or `.then(...)`.
- IE11 support dropped — `window.clipboardData` and all IE-specific code paths removed.
- `window.prompt()` fallback is now opt-in — pass `options.fallbackToPrompt: true` to restore. Off by default.
- Build output moved to `dist/` — direct `require('copy-to-clipboard/index.js')` imports will break; use the package name only.

### 🚀 Enhancements

- `navigator.clipboard.writeText()` is now the default copy path in secure contexts (HTTPS / `localhost`).
- `navigator.clipboard.write()` with `ClipboardItem` for rich text / HTML copying when `options.format` or `options.onCopy` is set.
- `options.format` — set a custom MIME type (e.g. `'text/html'`) to copy formatted content; `text/plain` is always included alongside it.
- `options.onCopy` — callback receives a `ClipboardItem` on the async path (return a replacement to override) or a `DataTransfer` on the execCommand fallback path.
- `options.fallbackToPrompt` — opt-in `window.prompt()` fallback for non-secure contexts.
- Dual ESM / CJS package via `tsup`: `dist/index.mjs`, `dist/index.cjs`, `dist/index.global.js` (IIFE), with a proper `exports` field and `sideEffects: false`.
- TypeScript declarations for both ESM (`index.d.mts`) and CJS (`index.d.ts`) consumers.
- Multi-browser local test suite with Nightwatch v3: Chrome, Firefox, Edge, and Safari — plus LambdaTest cloud CI for all four browsers.
- Platform detection uses `navigator.userAgentData?.platform` with a userAgent regex fallback (fixes [#123](https://github.com/sudodoki/copy-to-clipboard/issues/123)).
- `console.warn` emitted in debug mode when falling back from a non-secure context.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.3.3

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.3.2...v3.3.3)

### 🩹 Fixes

- Bump `minimatch` from 3.0.4 to 3.1.2 to address a known security vulnerability.

### 📖 Documentation

- Add note for Electron users about clipboard access requirements.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.3.2

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.3.1...v3.3.2)

### 🩹 Fixes

- Add `aria-hidden` to the hidden copy span to prevent screen readers from narrating the copied text ([#119](https://github.com/sudodoki/copy-to-clipboard/issues/119)).
- Fix npm audit issues ([#116](https://github.com/sudodoki/copy-to-clipboard/issues/116)).

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.3.1

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.3.0...v3.3.1)

### 🩹 Fixes

- Update TypeScript definitions to correct overload signatures ([#96](https://github.com/sudodoki/copy-to-clipboard/pull/96)).

### ❤️ Contributors

- 二货爱吃白萝卜 ([@zombieJ](https://github.com/zombieJ))

## v3.3.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.2.1...v3.3.0)

### 🚀 Enhancements

- Add `options.onCopy` callback, allowing callers to set custom clipboard formats via the `DataTransfer` object ([#89](https://github.com/sudodoki/copy-to-clipboard/pull/89), merged as [#94](https://github.com/sudodoki/copy-to-clipboard/pull/94)).

### ❤️ Contributors

- Eitan Peer ([@eitanp461](https://github.com/eitanp461))
- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.2.1

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.2.0...v3.2.1)

### 🩹 Fixes

- Fix copy with custom formatting on IE ([#93](https://github.com/sudodoki/copy-to-clipboard/pull/93)).

### ❤️ Contributors

- Ward Delabastita ([@wdlb](https://github.com/wdlb))

## v3.2.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.1.0...v3.2.0)

### 🚀 Enhancements

- Add `options.format` to copy content with a custom MIME type ([#79](https://github.com/sudodoki/copy-to-clipboard/pull/79)).

### ❤️ Contributors

- Sloane Sturzenegger ([@sloane](https://github.com/sloane))

## v3.1.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.9...v3.1.0)

### 🩹 Fixes

- Prevent the copy event from bubbling up to `document.body`, avoiding unintended side effects in host applications.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.0.9

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.8...v3.0.9)

### 🩹 Fixes

- Update `toggle-selection` minimum version (fixes [#67](https://github.com/sudodoki/copy-to-clipboard/issues/67)).

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.0.8

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.7...v3.0.8)

### 🚀 Enhancements

- Add `boolean` return type to TypeScript definitions ([#52](https://github.com/sudodoki/copy-to-clipboard/pull/52)).
- Add `LICENSE` file ([#55](https://github.com/sudodoki/copy-to-clipboard/pull/55)).
- Add GitHub Pages demo page.

### ❤️ Contributors

- Martynas Žilinskas ([@MartynasZilinskas](https://github.com/MartynasZilinskas))
- pete higgins ([@phiggins](https://github.com/phiggins))
- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.0.7

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.6...v3.0.7)

### 🚀 Enhancements

- Add initial TypeScript definitions for the module ([#50](https://github.com/sudodoki/copy-to-clipboard/pull/50)).

### ❤️ Contributors

- Denis ([@DenisCarriere](https://github.com/DenisCarriere))

## v3.0.6

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.5...v3.0.6)

### 🩹 Fixes

- Set hidden span styles via individual properties instead of `cssText` to avoid conflicts with host page CSS resets ([#48](https://github.com/sudodoki/copy-to-clipboard/pull/48)).

### ❤️ Contributors

- Rory Hunter ([@pugnascotia](https://github.com/pugnascotia))

## v3.0.5

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.4...v3.0.5)

### 🩹 Fixes

- Reset user-agent styles on the hidden selection element to prevent layout side effects ([#44](https://github.com/sudodoki/copy-to-clipboard/pull/44)).

### ❤️ Contributors

- Alexey Shvaika ([@shvaikalesh](https://github.com/shvaikalesh))

## v3.0.4

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.3...v3.0.4)

### 🚀 Enhancements

- Return value now reflects outcome: `true` if the modern clipboard method succeeded, `false` if the `window.prompt()` fallback was used ([#41](https://github.com/sudodoki/copy-to-clipboard/pull/41)).

### 🩹 Fixes

- Fix server-side rendering: no longer accesses `document` at import time ([#40](https://github.com/sudodoki/copy-to-clipboard/pull/40)).

### ❤️ Contributors

- Marius Andra ([@mariusandra](https://github.com/mariusandra))
- Nikita Butenko ([@nkbt](https://github.com/nkbt))

## v3.0.3

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.2...v3.0.3)

### 🩹 Fixes

- Use `setAttribute` instead of the deprecated setter; stop inheriting `user-select` on the hidden element ([#37](https://github.com/sudodoki/copy-to-clipboard/pull/37)).
- Fix debug message key-combo placeholder rendering ([#36](https://github.com/sudodoki/copy-to-clipboard/pull/36)).

### 🏡 Chore

- Add E2E test suite ([#29](https://github.com/sudodoki/copy-to-clipboard/pull/29)).
- Add Travis CI with multi-browser support: IE11, Edge, Chrome, Firefox ([#33](https://github.com/sudodoki/copy-to-clipboard/pull/33), [#35](https://github.com/sudodoki/copy-to-clipboard/pull/35)).

### ❤️ Contributors

- Alexey Shvaika ([@shvaikalesh](https://github.com/shvaikalesh))
- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.0.2

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/v3.0.1...v3.0.2)

### 🩹 Fixes

- Use CSS `clip` instead of `overflow: hidden` / zero dimensions to hide the copy element, preventing layout reflow.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v3.0.1

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/3.0.0...v3.0.1)

### 🩹 Fixes

- Fix MS Edge scrolling to the last appended and selected `HTMLElement` ([#27](https://github.com/sudodoki/copy-to-clipboard/pull/27)).

### ❤️ Contributors

- Mikhail Tsyplakov ([@jaybekster](https://github.com/jaybekster))

## v3.0.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/2.1.0...3.0.0)

### ⚠️ Breaking Changes

- Remove `options.cb` callback (introduced in v2.1.0). Use the returned `boolean` to determine success instead ([#25](https://github.com/sudodoki/copy-to-clipboard/pull/25)).

### 🩹 Fixes

- Fix duplicate `copyKey` definition.
- Add `'use strict'`.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v2.1.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/2.0.0...2.1.0)

### 🚀 Enhancements

- Use ⌘ in the Mac prompt message ([#24](https://github.com/sudodoki/copy-to-clipboard/pull/24)).
- Add `options.cb` callback executed after a successful copy ([#22](https://github.com/sudodoki/copy-to-clipboard/pull/22)).

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v2.0.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/1.1.1...2.0.0)

### ⚠️ Breaking Changes

- The function now accepts an `options` object as the second argument instead of individual parameters.

### 🚀 Enhancements

- Add `options.debug` and `options.message` for custom prompt text ([#18](https://github.com/sudodoki/copy-to-clipboard/pull/18)).

### 🩹 Fixes

- Fix crash when no options are passed ([#19](https://github.com/sudodoki/copy-to-clipboard/pull/19)).
- Use `textContent` instead of `innerHTML` when seeding the copy element.

### ❤️ Contributors

- Michael ([@evenchange4](https://github.com/evenchange4))
- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v1.1.1

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/1.1.0...1.1.1)

### 🏡 Chore

- Add `repository` field to `package.json` ([#9](https://github.com/sudodoki/copy-to-clipboard/pull/9)).

### ❤️ Contributors

- Jordan Harband ([@ljharb](https://github.com/ljharb))

## v1.1.0

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/1.0.4...1.1.0)

### 🩹 Fixes

- Fix newline handling: switch from `textContent` to `innerHTML` when seeding the copy element (fixes [#7](https://github.com/sudodoki/copy-to-clipboard/issues/7), [#8](https://github.com/sudodoki/copy-to-clipboard/pull/8)).

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v1.0.4

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/1.0.2...1.0.4)

### 🚀 Enhancements

- Integrate `toggle-selection` for reliable selection/deselection across browsers ([#5](https://github.com/sudodoki/copy-to-clipboard/pull/5)).

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))

## v1.0.2

[compare changes](https://github.com/sudodoki/copy-to-clipboard/compare/1.0.0...1.0.2)

### 🩹 Fixes

- IE8 support: guard `Selection.removeRange` and fix `throw` usage ([#1](https://github.com/sudodoki/copy-to-clipboard/pull/1)).
- Code style improvements and additional error handling.

### ❤️ Contributors

- Alexey Shvaika ([@shvaikalesh](https://github.com/shvaikalesh))

## v1.0.0

Initial release.

### ❤️ Contributors

- Джон, просто Джон ([@sudodoki](https://github.com/sudodoki))
