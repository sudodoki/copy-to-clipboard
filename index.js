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

    mark = document.createElement('textarea');
    mark.value = text;

    document.body.appendChild(mark);

    mark.select();

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch (err) {
    debug && console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
    } catch (err) {
      debug && console.error('unable to copy, falling back to prompt');
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
