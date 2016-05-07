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
|options.cb     |noop|`Function`. Optional. Callback to be executed after successful copying.|

`*` - message features `⌘` instead of `Ctrl`

# Browser support

Works everywhere where there's `prompt` available. Works best (i.e. without additional keystrokes) in Chrome, FF and, supposedly, Edge.

Note: **not working on IOS atm**

# UI components based on this package:
+ [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
+ [copy-button](https://github.com/sudodoki/copy-button)

# See also
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_Compatibility)
+ [April 2015 update on Cut and Copy Commands](http://updates.html5rocks.com/2015/04/cut-and-copy-commands)
