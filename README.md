# Copy to clipboard

Simple module exposing `copy(input: text)` function that would try to use [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_Compatibility) with fallback to IE specific `clipboardData` interface and finally, fallback to simple prompt with proper text content & 'Copy to clipboard: Ctrl+C, Enter'

# Example

```
import copy from 'copy-to-clipboard';

copy('Text');

# Copy with options
copy('Text', {
  debug: true,
  message: 'Press ⌘-C to copy',
});

```

# API

`copy(input: text, options)` - tries to copy text to clipboard.

|Value |Default |Notes|
|------|--------|-----|
|options.debug  |false| `Boolean`. Optional. Enable output to console. |
|options.message|Copy to clipboard: Ctrl+C, Enter|`String`. Optional. Prompt message.|

`*` - for Mac OS users message features `⌘` instead of `Ctrl`

# [Browser support](http://caniuse.com/#feat=document-execcommand)

Works everywhere where there's `prompt` available. Works best (i.e. without additional keystrokes) in Chrome, FF and, supposedly, IE.

Note: **not working on some older IOS devices**

# Installation

+ Can be used as npm package and then leveraged using commonjs bundler/loader.
```
npm i --save copy-to-clipboard
```
+ Can be utilized using [wzrd.in](https://wzrd.in/).
After adding following script to your page
```
<script src='https://wzrd.in/standalone/copy-to-clipboard@latest'></script>
```
You will have `window.copyToClipboard` exposed for you to use

# UI components based on this package:
+ [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
+ [copy-button](https://github.com/sudodoki/copy-button)

# See also
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_Compatibility)
+ [April 2015 update on Cut and Copy Commands](http://updates.html5rocks.com/2015/04/cut-and-copy-commands)
