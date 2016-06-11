'use strict';

var deselectCurrent = require('toggle-selection');

var copyKey = /mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';
var defaultMessage = 'Copy to clipboard: ' + copyKey + '+C, Enter';

function copy(text, options) {
  var debug, message, reselectPrevious, range, selection, mark;
  if (!options) { options = {}; }
  debug = options.debug || false;
  message = options.message || defaultMessage;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('mark');
    mark.textContent = text;
    // used to conserve newline, etc
    mark.style.whiteSpace = 'pre';

    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = '0';
    mark.style.clip = 'rect(0px 0px 0px 0px)';

    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch (err) {
    debug && console.error('unable to copy using execCommand:', err);
    debug && console.warn('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
    } catch (err) {
      debug && console.error('unable to copy using clipboardData : ', err);
      debug && console.error('falling back to prompt');
      window.prompt(message, text);

    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
}

module.exports = copy;
