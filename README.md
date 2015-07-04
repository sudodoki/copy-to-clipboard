# Copy to clipboard

Simple module exposing `copy(input: text)` function that would try to use [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_Compatibility) with fallback to IE specific `clipboardData` interface and finally, fallback to simple prompt with proper text content & 'Copy to clipboard: Ctrl+C, Enter'

# API

`copy(input: text)` - tries to copy text to clipboard.

# Browser support

Works everywhere where there's `prompt` available. Works best (i.e. without additional keystrokes) in Chrome and, supposedly, IE. FF support to come soon-ish.

Note: **not working on IOS atm**

# UI components based on this package:
+ [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
+ [copy-button](https://github.com/sudodoki/copy-button)

# See also
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_Compatibility)
+ [April 2015 update on Cut and Copy Commands](http://updates.html5rocks.com/2015/04/cut-and-copy-commands)
