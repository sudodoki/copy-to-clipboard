# Copy to clipboard [![CI](https://github.com/sudodoki/copy-to-clipboard/actions/workflows/github-ci.yml/badge.svg)](https://github.com/sudodoki/copy-to-clipboard/actions/workflows/github-ci.yml)

Simple module exposing an async `copy` function that uses the [Async Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) (`navigator.clipboard`) in secure contexts (HTTPS / localhost), with automatic fallback to `document.execCommand('copy')` for non-secure contexts or older browsers.

> If you are building using [Electron](http://electronjs.org/), use [their API](https://www.electronjs.org/docs/latest/api/clipboard).

# Example

```js
import copy from 'copy-to-clipboard';

await copy('Text');

// Copy with options
await copy('Text', {
  debug: true,
  message: 'Press #{key} to copy',
});

// Copy as HTML (text/html + text/plain written simultaneously)
await copy('<b>Hello <i>world</i></b>', { format: 'text/html' });

// Custom plain-text fallback via onCopy
await copy('<b>Hello <i>world</i></b>', {
  format: 'text/html',
  onCopy: () => new ClipboardItem({
    'text/html': new Blob(['<b>Hello <i>world</i></b>'], { type: 'text/html' }),
    'text/plain': new Blob(['Hello world'], { type: 'text/plain' }),
  }),
});
```

# API

`copy(text: string, options?: object): Promise<boolean>` — copies text to clipboard. Returns `true` on success, `false` if all paths failed (no additional keystrokes were required from the user).

> **v4 breaking change:** `copy()` is now async and returns `Promise<boolean>`. Use `await copy(...)` to get the result.

## Options

| Value | Default | Notes |
|-------|---------|-------|
| `options.debug` | `false` | `Boolean`. Enable output to console. |
| `options.message` | `'Copy to clipboard: #{key}, Enter'` | `String`. Prompt message used when `fallbackToPrompt` is enabled. All occurrences of `#{key}` are replaced with `⌘+C` on macOS or `Ctrl+C` otherwise. |
| `options.format` | — | `String`. MIME type to copy as. Use `'text/html'` to copy rich text; `'text/plain'` to strip inherited styles when pasting into rich-text editors. When set alongside `'text/html'`, both `text/html` and `text/plain` are written simultaneously via `ClipboardItem`. |
| `options.onCopy` | — | `(clipboardData: ClipboardItem \| DataTransfer) => ClipboardItem \| void`. Called before the write. On the async path, receives the constructed `ClipboardItem` and may return a new one to replace it (useful for custom MIME types or a different plain-text fallback). On the `execCommand` fallback path, receives the `DataTransfer` object; return value is ignored. |
| `options.fallbackToPrompt` | `false` | `Boolean`. If `true`, shows a `window.prompt()` as a last resort when both `navigator.clipboard` and `execCommand` fail. Off by default in v4. |

## Copy path selection

1. **`navigator.clipboard.writeText(text)`** — used when the page is a secure context (HTTPS / localhost), `navigator.clipboard` is available, and neither `options.format` nor `options.onCopy` is set.
2. **`navigator.clipboard.write([ClipboardItem])`** — used in a secure context when `options.format` or `options.onCopy` is set. Builds a `ClipboardItem` with `text/plain` always present; adds the requested MIME type alongside it. `onCopy` may return a replacement `ClipboardItem`.
3. **`execCommand('copy')` fallback** — used on non-HTTPS pages, when `navigator.clipboard` is unavailable, or when the async write throws. Uses a hidden `<span>` element. `preventDefault` is only called when `options.format` is set.
4. **`window.prompt()` fallback** — opt-in via `options.fallbackToPrompt: true`.

# Recipes

## HTML copy with stripped plain-text fallback

By default, `copy(html, { format: 'text/html' })` puts the raw HTML string in the `text/plain` slot of the `ClipboardItem`. If you want apps that only accept plain text to receive readable content instead of markup, use `onCopy` to supply a stripped version:

```js
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

const html = '<b>Hello <i>world</i></b>';

await copy(html, {
  format: 'text/html',
  onCopy: () => new ClipboardItem({
    'text/html': new Blob([html], { type: 'text/html' }),
    'text/plain': new Blob([stripHtml(html)], { type: 'text/plain' }),
  }),
});
// text/html  → '<b>Hello <i>world</i></b>'
// text/plain → 'Hello world'
```

## Custom MIME type

```js
await copy('col1,col2\nval1,val2', {
  format: 'text/csv',
});
// text/csv   → 'col1,col2\nval1,val2'
// text/plain → 'col1,col2\nval1,val2'  (always included as fallback)
```

---

# Browser support

| Browser | Minimum | Notes |
|---------|---------|-------|
| Chrome | 76+ | Full `ClipboardItem` + `write()` support |
| Firefox | 127+ | Full `ClipboardItem` + `write()` landed in Firefox 127 (mid-2024) |
| Safari | 13.1+ | `writeText()` and `write()` available |
| Edge | 79+ | Chromium-based; same as Chrome |

`execCommand` fallback retains support for non-HTTPS contexts and any browser that reaches the catch path.

> **Note:** The async clipboard write must occur within a user gesture (click, keydown, etc.). This library is designed to be called from event handlers, so this constraint is normally satisfied automatically.

# Installation

```
npm i copy-to-clipboard
```

Available as CommonJS, ES module, and IIFE (for `<script>` tags):

```js
// ESM
import copy from 'copy-to-clipboard';

// CommonJS
const copy = require('copy-to-clipboard');
```

```html
<!-- IIFE via CDN — exposes window.copyToClipboard -->
<script src="https://unpkg.com/copy-to-clipboard/dist/index.global.js"></script>
```

# TypeScript

Built-in declarations are included for both CommonJS and ESM consumers.

```ts
import copy from 'copy-to-clipboard';
import type { Options } from 'copy-to-clipboard';

const result: boolean = await copy('text');
```

# UI components based on this package

- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
- [copy-button](https://github.com/sudodoki/copy-button)

# See also

- [clipboard-copy](https://github.com/feross/clipboard-copy) by [@feross](https://github.com/feross)
- [Async Clipboard API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [ClipboardItem (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem)

# Running Tests

End-to-end tests are powered by [Nightwatch](https://nightwatchjs.org/) using native browser drivers.

```
npm i
npm test               # Chrome (default)
npm run test:firefox
npm run test:safari
npm run test:edge
npm run test:all       # all local browsers
```

**Safari prerequisite:** enable "Allow Remote Automation" in Safari's Develop menu. See [Testing with WebDriver in Safari](https://developer.apple.com/documentation/webkit/testing-with-webdriver-in-safari).

## CI

**Chrome, Firefox, and Edge** tests run automatically on every push to `master` and on pull requests via GitHub Actions (Ubuntu runner, headless).

**Cross-browser** tests (Chrome, Firefox, Safari, Edge) run on [LambdaTest](https://www.lambdatest.com/) automatically on every version tag (`v*`) and can be triggered manually from the Actions tab. Requires `LT_USERNAME` and `LT_ACCESS_KEY` repository secrets.

```
npm run test:lt:chrome
npm run test:lt:firefox
npm run test:lt:safari
npm run test:lt:edge
npm run test:lt:all
```

# Breaking changes in v4

1. **`copy()` is now async** — returns `Promise<boolean>` instead of `boolean`. Wrap call sites with `await`.
2. **IE11 support dropped** — `window.clipboardData` path removed.
3. **`window.prompt()` fallback is opt-in** — set `options.fallbackToPrompt: true` to enable.
4. **Build output moved to `dist/`** — direct `require('copy-to-clipboard/index.js')` paths will break; use the package name only.
